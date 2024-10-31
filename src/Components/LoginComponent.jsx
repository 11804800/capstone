import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {

  const route=useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  //if the input change it will check which input is changing by checking the name of event
  //and then it will update the user state
  function OnInputChange(e) {

  }

  function Login() {
    alert("");
  }

  return (
    <>
    <button className="flex text-sm font-semibold text-zinc-600 items-center gap-1 p-3 hover:text-[brown] hover:underline active:text-blue-600" onClick={()=>route("/")}>
      <FaArrowLeft/>
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
        />
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 p-2 text-sm rounded outline-none"
          type="password"
          name="password"
          placeholder="Password"
        />
        <div className="w-full py-6">
          <button
            className="border-2 px-6 py-2 rounded font-semibold bg-[brown] text-white text-sm drop-shadow-md active:drop-shadow-none"
            onClick={Login}
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
          <button className="text-sm font-semibold text-blue-700 hover:underline hover:text-[brown]" onClick={()=>route("/signup")}>Signup</button>
        </div>
      </div>
    </div>
    </>
  );
}
