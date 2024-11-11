import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Login } from "../Redux/UserSlice";

export default function LoginComponent() {
  //hook for routing
  const route = useNavigate();

  //state for error message
  const [err, setError] = useState("");
  //state for response
  const [message, setMessage] = useState("");
  //state to check if the form has been submitted once
  const [formsubmitted, setFromSubmitted] = useState(false);

  //state for form inputs
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  //for dispatching the redux actions
  const dispatch=useDispatch();

  //if the input change it will check which input is changing by checking the name of event
  //and then it will update the user state
  function OnInputChange(e) {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function LoginUser() {
    setFromSubmitted(true);

    const body = {
      username: user.username,
      password: user.password,
    };

    if (user.username && user.password) {
      axios
        .post("http://localhost:3000/user/login", body)
        .then(
          (response) => {
            if (response) {
              setMessage("Login Successfull");
              setError("");
              //storing the jwt token in the localstorage
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              );
              //storing the username in local storage
              localStorage.setItem("user", JSON.stringify(user.username));
              dispatch(Login({token:response?.data?.token,user:user.username}));
              //redirecting to home after 2 seconds
              setTimeout(() => {
                route("/");
              }, 2000);
            }
          },
          (err) => {
            setError(err.response.data.message);
            setMessage("");
          }
        )
        .catch((err) => alert(err.message));
    }
  }

  return (
    <>
      <button
        className="flex text-sm font-semibold text-zinc-600 items-center gap-1 p-3 hover:text-[brown] hover:underline active:text-blue-600"
        onClick={() => route("/")}
      >
        <FaArrowLeft />
        Back to Home
      </button>
      <div className="flex flex-col gap-8 w-full h-[92dvh] justify-center items-center">
        <div className="flex flex-col gap-3 w-[340px] md:w-[50%] sm:shadow-md p-2 md:p-6">
          <div className="flex flex-col gap-2 py-6">
            <h1 className="font-bold text-3xl">SignIn</h1>
            <p className="text-sm font-semibold">Welcome back to Youtube</p>
          </div>
          <label className="font-semibold" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            placeholder="Username or Email-id"
            className="border-2 p-2 rounded  outline-none text-sm"
            name="username"
            onChange={(e) => OnInputChange(e)}
          />
          {formsubmitted && !user.username && (
            <p className="text-[brown] text-[11px] font-semibold">Required</p>
          )}
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 p-2 text-sm rounded outline-none"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => OnInputChange(e)}
          />
          {formsubmitted && !user.password && (
            <p className="text-[brown] text-[11px] font-semibold">Required</p>
          )}
          {err ? (
            <p className="text-[brown] font-semibold text-[11px]">
              {err} Please Try Again
            </p>
          ) : (
            message && (
              <p className="text-[green] font-semibold text-[11px]">
                {message} Redirecting to Home Page
              </p>
            )
          )}
          <div className="w-full py-6">
            <button
              className="border-2 px-6 py-2 rounded font-semibold bg-[brown] text-white text-sm drop-shadow-md active:drop-shadow-none"
              onClick={LoginUser}
            >
              Login
            </button>
          </div>
          <div className="w-full p-1 border-t-2 flex items-center justify-center">
            <div className="relative">
              <p className="absolute bottom-[-10px] bg-white p-1">Or</p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <p className="text-sm font-semibold text-zinc-500">
              New to Youtube?
            </p>
            <button
              className="text-sm font-semibold text-blue-700 hover:underline hover:text-[brown]"
              onClick={() => route("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
