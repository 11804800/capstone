import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function SignupComponent() {

  const route=useNavigate();

  return (
    <>
    <button className="flex text-sm font-semibold text-zinc-600 items-center gap-1 p-3 hover:text-[brown] hover:underline active:text-blue-600" onClick={()=>route("/")}>
      <FaArrowLeft/>
      Back to Home
    </button>
    <div className="flex flex-col gap-8 w-full h-[100dvh] justify-center items-center">
      <div className="flex flex-col gap-3 w-[340px] md:w-[50%] md:shadow-md p-2 md:p-6">
        <div className="flex flex-col gap-2 py-6">
          <p className="text-sm font-semibold">Welcome to Youtube</p>
          <h1 className="font-bold text-3xl flex gap-2 items-center">
            SignUp to <img src="/logo.png" alt="youtube-logo" width="120" />
          </h1>
        </div>
        <label className="font-semibold" htmlFor="name">
          FullName
        </label>
        <input
          type="text"
          placeholder="name"
          className="border-2 p-2 rounded  outline-none text-sm"
          name="name"
        />
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          placeholder="example@gmail.com"
          className="border-2 p-2 rounded  outline-none text-sm"
          name="email"
        />
        <label className="font-semibold" htmlFor="name">
          Username
        </label>
        <input
          type="text"
          placeholder="name"
          className="border-2 p-2 rounded  outline-none text-sm"
          name="name"
        />
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 p-2 text-sm rounded outline-none"
          type="password"
          placeholder="password"
          name="password"
        />
        <div className="w-full py-6">
          <button className="border-2 px-6 py-2 rounded font-semibold bg-[brown] text-white text-sm drop-shadow-md active:drop-shadow-none">
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
          <button className="text-sm font-semibold text-blue-700 hover:underline hover:text-[brown]" onClick={()=>route("/login")}>SignIn</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default SignupComponent;
