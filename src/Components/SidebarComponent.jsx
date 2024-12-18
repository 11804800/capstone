import { useState } from "react";
import { CgClapperBoard } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { GiGamepad } from "react-icons/gi";
import { GrChannel } from "react-icons/gr";
import { HiDownload, HiOutlineFire, HiOutlineLogout } from "react-icons/hi";
import { HiOutlineMusicalNote, HiOutlineTrophy } from "react-icons/hi2";
import {
  MdHistory,
  MdOutlineHome,
  MdOutlineNewspaper,
  MdOutlineShoppingBag,
  MdOutlineSubscriptions,
  MdOutlineWatchLater,
  MdPlaylistPlay,
  MdPodcasts,
  MdThumbUpOffAlt,
} from "react-icons/md";
import { PiCaretRightThin, PiCoatHanger } from "react-icons/pi";
import { RiYoutubeLine } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../Redux/UserSlice";
import { HiOutlineUserCircle } from "react-icons/hi";

function SidebarComponent() {
  const dispatch = useDispatch();

  //Current date instance
  const date = new Date();

  //state to toggle the scrollbar visibility
  const [visible, setVisible] = useState(false);

  const route = useNavigate();
  const user = useSelector((state) => {
    return state.user.user;
  });

  return (
    //onMouseEnter it will set the visible state true which will make the scrollbar visible
    //onMouseLeave it will set the visible state false which will hide the scrollbar
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={`${
        visible ? "Scrollbar" : "No-Scrollbar"
      }   fixed md:w-[250px] w-full shadow-sm h-[93dvh] overflow-auto flex flex-col gap-4 justify-start items-start p-2 transition-all duration-300`}
    >
      <div className="flex flex-col items-start gap-2 border-b border-zinc-200 w-full p-2">
        <Link
          to="/"
          className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold"
        >
          <MdOutlineHome size={23} />
          Home
        </Link>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <SiYoutubeshorts size={23} />
          Shorts
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <MdOutlineSubscriptions size={23} />
          Subscriptions
        </button>
      </div>
      {/* it will show only when user is logged else it will show login btn */}
      {user ? (
        <>
          <div className="flex flex-col gap-2 items-start border-b border-zinc-200 w-full p-2">
            <h1 className="p-2 font-semibold flex items-center justify-start ">
              You <PiCaretRightThin />{" "}
            </h1>
            {/* //route to show history of watched videos */}
            <button
              className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold"
              onClick={() => route("/history")}
            >
              <MdHistory size={23} />
              History
            </button>
            <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
              <MdPlaylistPlay size={25} />
              Playlists
            </button>
            <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
              <RiYoutubeLine size={23} />
              Your Videos
            </button>
            <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
              <MdOutlineWatchLater />
              Watch later
            </button>
            <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
              <MdThumbUpOffAlt />
              Liked Videos
            </button>
            <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
              <HiDownload />
              Downloads
            </button>
          </div>
          <div className="flex flex-col gap-2 items-start border-b border-zinc-200 w-full p-2">
            <h1 className="w-full font-semibold p-2">Subscriptions</h1>
            <p className="p-2 hover:bg-zinc-200 w-full">Show Subscribed</p>
          </div>
        </>
      ) : (
        <div className="roboto-medium flex flex-col gap-2 justify-center items-center w-full border-b py-2">
          <p>Login to view</p>
          <Link
            to="/login"
            className="flex px-2 font-semibold text-blue-700 py-1 border-2 rounded-2xl items-center text-sm min-w-fit hover:text-[brown] active:text-blue-700"
          >
            <HiOutlineUserCircle size={21} />
            Sign In
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-2 items-start border-b border-zinc-200 w-full p-2">
        <h1 className="font-semibold p-2">Explore</h1>
        <button className="p-2 hover:bg-zinc-200 w-full hover:font-semibold rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <HiOutlineFire />
          Trending
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <MdOutlineShoppingBag />
          Shopping
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <HiOutlineMusicalNote />
          Music
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <CgClapperBoard />
          Movies
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <GiGamepad />
          Gaming
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <MdOutlineNewspaper />
          News
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <HiOutlineTrophy />
          Sports
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <PiCoatHanger />
          Fashion & Beauty
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <MdPodcasts />
          Podcasts
        </button>
      </div>
      <div className="flex flex-col gap-2 items-start w-full p-2">
        <h1 className="font-semibold p-2">Personal</h1>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-start focus:bg-zinc-200 focus:font-semibold">
          <GrChannel />
          Your Channel
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex items-center justify-start gap-2 focus:bg-zinc-200 focus:font-semibold">
          <CiSettings size={23} />
          Settings
        </button>
        {/* //button to logout when user is logged in  else signup btn */}
        {user ? (
          <button
            className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex items-center justify-start gap-2 focus:bg-zinc-200 focus:font-semibold"
            onClick={() => {
              dispatch(Logout());
              route("/");
            }}
          >
            <HiOutlineLogout />
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="flex px-2 font-semibold text-blue-700 py-1 border-2 rounded-2xl items-center text-sm min-w-fit hover:text-[brown] active:text-blue-700"
          >
            <HiOutlineUserCircle size={21} />
            Sign In
          </Link>
        )}
        <p className="p-2 text-[11px] font-semibold text-zinc-600">
          @ {date.getFullYear()} Copyright
        </p>
      </div>
    </div>
  );
}
export default SidebarComponent;
