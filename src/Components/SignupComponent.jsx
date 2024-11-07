import axios from "axios";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function SignupComponent() {
  //hook for routing
  const route = useNavigate();

  //state for error message
  const [err, setError] = useState("");
  //state for response
  const [message, setMessage] = useState("");
  //state to check if the form has been submitted once
  const [formsubmitted,setFromSubmitted]=useState(false);

  //state for form inputs
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    email: "",
  });

  //function to change the object of the state based on the input name and value
  function OnValueChange(e) {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  //signup post function to create account
  //after successfull creation it will redirect to login page
  function Signup() {
    setFromSubmitted(true);
    const body = {
      username: user.username,
      fullname: user.firstname + " " + user.lastname,
      email: user.email,
      password: user.password,
    };

    if (
      user.email &&
      user.firstname &&
      user.lastname &&
      user.password &&
      user.username
    ) {
      axios
        .post("http://localhost:3000/user/signup", body)
        .then(
          (response) => {
            if (response) {
              setMessage(response.data.message);
              setError("");
              setTimeout(() => {
                route("/login");
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
      <div className="flex flex-col gap-8 w-full h-[100dvh] md:h-[94dvh] justify-center items-center">
        <div className="flex flex-col gap-3 w-[340px] md:w-[50%] md:shadow-md p-2 md:p-6">
          <div className="flex flex-col gap-2 py-6">
            <p className="text-sm font-semibold">Welcome to Youtube</p>
            <h1 className="font-bold text-3xl flex gap-2 items-center">
              SignUp to <img src="/logo.png" alt="youtube-logo" width="120" />
            </h1>
          </div>
          <label className="font-semibold" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            placeholder="username"
            className="border-2 p-2 rounded  outline-none text-sm"
            name="username"
            onChange={(e) => OnValueChange(e)}
          />
          { formsubmitted && !user.username && (
            <p className="text-[brown] text-[11px] font-semibold">Required</p>
          )}
          <label className="font-semibold" htmlFor="name">
            FullName
          </label>
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              placeholder="firstname"
              className="border-2 p-2 rounded  outline-none text-sm w-full"
              name="firstname"
              onChange={(e) => OnValueChange(e)}
            />
            <input
              type="text"
              placeholder="lastname"
              className="border-2 p-2 rounded  outline-none text-sm w-full"
              name="lastname"
              onChange={(e) => OnValueChange(e)}
            />
          </div>
          {formsubmitted && !user.firstname  && <p className="text-[brown] text-[11px] font-semibold">Required</p>
           }
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            placeholder="example@gmail.com"
            className="border-2 p-2 rounded  outline-none text-sm"
            name="email"
            onChange={(e) => OnValueChange(e)}
          />
          {  formsubmitted && !user.email && (
            <p className="text-[brown] text-[11px] font-semibold">Required</p>
          )}
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 p-2 text-sm rounded outline-none"
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => OnValueChange(e)}
          />

          {  formsubmitted && !user.password && (
            <p className="text-[brown] text-[11px] font-semibold">Required</p>
          )}

          {err ? (
            <p className="text-[brown] font-semibold text-[11px]">
              {err} Please Try Again
            </p>
          ) : (
            message && (
              <p className="text-[green] font-semibold text-[11px]">
                {message} Redirecting to Login Page
              </p>
            )
          )}
          <div className="w-full py-6">
            <button
              className="border-2 px-6 py-2 rounded font-semibold bg-[brown] text-white text-sm drop-shadow-md active:drop-shadow-none"
              onClick={Signup}
            >
              SignUp
            </button>
          </div>
          <div className="w-full p-1 border-t-2 flex items-center justify-center">
            <div className="relative">
              <p className="absolute bottom-[-10px] bg-white p-1">Or</p>
            </div>
          </div>
          <div className="flex gap-1 items-center text-sm font-semibold text-zinc-600">
            <p>Already Have Account?</p>
            <button
              className="text-sm font-semibold text-blue-700 hover:underline hover:text-[brown]"
              onClick={() => route("/login")}
            >
              SignIn
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupComponent;
