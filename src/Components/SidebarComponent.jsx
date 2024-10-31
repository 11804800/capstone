import { CiSettings } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

function SidebarComponent() {
  const date = new Date();
  return (
    <div className="w-[250px] h-[93dvh] overflow-auto flex flex-col gap-4 justify-start items-start p-2">
      <div className="flex flex-col items-start gap-2 border-b border-zinc-400 w-full p-2">
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex gap-2 items-center justify-center">
          <FaHome />
          Home
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Shorts
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Subscriptions
        </button>
      </div>
      <div className="flex flex-col gap-2 items-start border-b border-zinc-400 w-full p-2">
        <h1 className="font-semibold">You </h1>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          History
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Playlists
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Your Videos
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Watch later
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Liked Videos
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Downloads
        </button>
      </div>
      <div className="flex flex-col gap-2 items-start border-b border-zinc-400 w-full p-2">
        <h1 className="w-full font-semibold">Subscriptions</h1>
        <p className="p-2 hover:bg-zinc-200 w-full">Show Subscribed</p>
      </div>
      <div className="flex flex-col gap-2 items-start border-b border-zinc-400 w-full p-2">
        <h1 className="font-semibold">Explore</h1>
        <button className="p-2 hover:bg-zinc-200 w-full hover:font-semibold rounded-xl">
          Trending
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Shopping
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Music
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Movies
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Gaming
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          News
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Sports
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Fashion & Beauty
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Podcasts
        </button>
      </div>
      <div className="flex flex-col gap-2 items-start w-full p-2">
        <h1 className="font-semibold">Personal</h1>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl">
          Your Channel
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex items-center justify-center gap-2">
          <CiSettings size={23}/>
          Settings
        </button>
        <button className="p-2 hover:bg-zinc-200 hover:font-semibold w-full rounded-xl flex items-center justify-center gap-2">
          <LuLogOut/>
          Logout
        </button>
        <p className="p-2 text-[11px] font-semibold text-zinc-600">
          @ {date.getFullYear()} Copyright
        </p>
      </div>
    </div>
  );
}
export default SidebarComponent;
