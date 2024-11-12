import { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VideoItemComponent from "./VideoitemComponent";

function VideoListComponent() {
  //getting the data from videoslice
  const videos = useSelector((state) => {
    return state.media.videos;
  });

  const user = useSelector((state) => {
    return state.user.user;
  });

  //getting video filter option from media slice
  const Filters = useSelector((state) => {
    return state.media.filters;
  });

  //state for filters
  const [filter, SetFilter] = useState("");

  //filter if filter has no value then return the video else filter it based on the value
  const Video=filter=="" ? videos : videos.filter((item)=>item?.Category==filter);

  console.log(Filters);
  return (
    <>
      {!user ? (
        <div className="flex flex-col gap-4 pt-12 w-full justify-center items-center">
          <div className="p-12 border shadow-lg flex flex-col gap-4 w-[80%] justify-center items-center">
            <p className="text-2xl roboto-medium">
              Please Login To Browse Videos
            </p>
            <Link
              to="/login"
              className="flex px-2 font-semibold text-blue-700 py-1 border-2 rounded-2xl items-center text-sm min-w-fit hover:text-[brown] w-fit active:text-blue-700"
            >
              <HiOutlineUserCircle size={21} />
              Sign In
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-12 w-full">
          <div className="flex overflow-x-auto No-Scrollbar1 gap-6 px-6">
            <button
              className={`${
                filter ? "bg-zinc-100" : "bg-black text-white"
              } py-1 px-2 min-w-fit  roboto-medium text-sm border shadow rounded-md`}
              onClick={() => SetFilter("")}
            >
              All
            </button>
            {Filters?.map((item) => {
              return (
                <button
                  key={item}
                  className={`${
                    filter == item ? "bg-black text-white" : "bg-zinc-100"
                  } py-1 px-2 min-w-fit roboto-medium text-sm border shadow rounded-md`}
                  onClick={() => SetFilter(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap w-full py-5 px-2 gap-5 justify-center">
            {Video?.map((item) => {
              return (
                <VideoItemComponent key={item._id} data={item}/>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default VideoListComponent;
