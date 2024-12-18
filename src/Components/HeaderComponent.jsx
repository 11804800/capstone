import { useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdMic } from "react-icons/md";
import SearchModal from "./SearchModal";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HeaderComponent(props) {

  const [visible,setVisible]=useState(false);
  const route=useNavigate();
  
  const User=useSelector((state)=>{
    return state.user.userData
  });



  const [text,setText]=useState();



  return (
    <>
      {/* header container */}
      <div className="flex gap-4 h-12 items-center py-2 justify-between px-2 z-[-10]">
        <div className="flex gap-2">
          {/* side bar toggle button */}
          <button className="p-2" onClick={()=>props.setSidebarVisible(!props.sidebarvisible)}>
            <FaBars size={19} />
          </button>
          {/* youtube logo image */}
          <img
            src="/logo.png"
            alt="Youtube_logo"
            width="100"
            className="object-contain"
            onClick={()=>route("/")}
          />
        </div>
        {/* header sub container  */}
        <div className="flex gap-4 w-[75%] justify-center">
          {/* Search input container */}
          {/* hidden in small screen and visible on large screen  basically mobile and laptop*/}
          <div className="hidden md:flex border-2 rounded-3xl w-[80%]">
            <input
              type="text"
              placeholder="Search"
              className="border-0 py-1 px-6 bg-transparent focus:rounded-l-3xl  w-[97%]"
              name="search" 
              onChange={(e)=>setText(e.target.value)}
            />
            {/* search button */}
            <button className="border-l-2 px-2 bg-[#f8f8f8] rounded-r-2xl" onClick={()=>{
              route(`/search/${text}`);
            }}>
              <FiSearch size={20} />
            </button>
          </div>
          {/* static mic button visible in large hidden on small screen */}
          <button className="bg-[#f8f8f8] p-2 rounded-full hidden md:flex" onClick={()=>alert("I am a Static Button")}>
            <MdMic size={21} />
          </button>
        </div>
        {/* search btn visible only on small screen triggers a modal */}
        <button className="flex md:hidden" onClick={()=>setVisible(!visible)}>
          <FiSearch size={20} />
        </button>
        {/* three dots button */}
        <button className="bg-[#f8f8f8] p-2 rounded-full">
          <BiDotsVertical />
        </button>
        {/* Sign in info for login and user info if logged in */}
        {
          !User
          ?
        <Link to="/login" className="flex px-2 font-semibold text-blue-700 py-1 border-2 rounded-2xl items-center text-sm min-w-fit hover:text-[brown] active:text-blue-700">
          <HiOutlineUserCircle size={21} />
          Sign In
        </Link>
        :
        //route to userinfopage
        <Link to={`/user/${User?.username}`}>
          {User?.avatar ? <img src={`http://localhost:3000/${User.avatar}`} className="rounded-full" width="35" height="35"/> :<img src="/User.png" width="35" height="35" />}
        </Link>
        }
      </div>
      {
        visible && <SearchModal setVisible={setVisible}/>
      }
    </>
  );
}

export default HeaderComponent;
