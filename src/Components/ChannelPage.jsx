import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";

function ChannelPage() {

  //getting the channel data from redux store
  const Channel=useSelector((state)=>{
    return state.channel.channels
  })

  const [data, setData] = useState();


  return (
    <div className="w-full p-3 flex flex-col gap-3 ">
      <img
        src={data?.banner}
        className="rounded-xl h-[20dvh] md:h-[32dvh] object md:w-[95%] w-full object-fill"
      />
      <div className="flex w-full md:w-[80%] md:h-[25dvh]  items-center">
        <div className="w-[20%] flex justify-center items-center">
          <img src={data?.image} className="rounded-full"/>
        </div>
        <div className="flex flex-col gap-1 w-[80%] roboto-medium">
          <h1 className="font-bold text-sm md:text-4xl">{data?.name}</h1>
          <div
            id="Channel-info"
            className="font-semibold md:font-normal flex flex-col md:flex-row md:gap-2 text-sm text-black md:text-[#707070]"
          >
            <span>@{data?.name}</span>
            <div className="flex gap-1 text-[#707070] text-[11px] md:text-sm ">
              <span>{data?.Subscriber_Count} Subscribers</span>
              <span>{data?.videos?.length} Videos</span>
            </div>
          </div>
          {/* //display on large screen size */}
          <div className="text-sm font-medium  w-[80%] hidden md:flex">
            <p className="line-clamp-1 text-[#707070]">{data?.description}</p>
            <button className="font-semibold">...more.</button>
          </div>
          <button className="bg-black text-white text-sm w-fit rounded-3xl px-4 py-2 font-semibold shadow-md hidden md:flex">
            Subscribe
          </button>
        </div>
      </div>
      {/* //display on mobile screen size */}
      <div className=" text-[11px] md:text-sm font-medium  md:w-[80%] flex md:hidden">
        <p className="line-clamp-2 text-[#707070]">{data?.description}</p>
        <button className="font-semibold">...more.</button>
      </div>
      <button className="bg-black text-white rounded-2xl md: px-4 py-1 font-semibold shadow-md text-sm flex md:hidden justify-center">
        Subscribe
      </button>
      <div
        id="tab-buttons"
        className="border-b-2 flex gap-12 overflow-auto No-Scrollbar pt-4 roboto-medium text-sm"
      >
        <button className="">Home</button>
        <button className="">Videos</button>
        <button className="">Shorts</button>
        <button className="">Live</button>
        <button className="">Playlists</button>
        <button className="">Community</button>
      </div>
      <div id="video-list">
        {!data?.videos.length ? (
          <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-4">
            <h1 className="text-sm md:text-2xl font-semibold roboto ">No Videos Uploaded Yet</h1>
            <button className="border-2 p-2 font-medium flex items-center text-sm">Upload New Video <FaPlus/></button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ChannelPage;
