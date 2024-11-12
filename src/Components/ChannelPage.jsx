import axios from "axios";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SubscribeComponent from "./Subscribe";

function ChannelPage() {
  //getting the route params channelName for filtering the data
  const params = useParams();
  const route = useNavigate();

  //getting the channel data from redux store
  const Channel = useSelector((state) => {
    return state.channel.channels;
  });

  //getting videos dat from redux store
  const VideoData = useSelector((state) => {
    return state.media.videos;
  });

  //getting user from redux store
  const user = useSelector((state) => {
    return state.user.userData;
  });

  return (
    <>
      {Channel?.filter((item) => item.name === params.ChannelName).map(
        (item) => {
          return (
            <div className="w-full p-3 flex flex-col gap-3 " key={item._id}>
              {/* channel banner */}
              <img
                src={item?.banner}
                className="rounded-xl h-[20dvh] md:h-[32dvh] object w-full object-contain"
              />
              <div className="flex w-full md:w-[80%] md:h-[25dvh]  items-center gap-2">
                {/* channel image */}
                <div className="w-[20%] flex justify-center items-center">
                  <img src={item?.image} className="rounded-full" />
                </div>
                {/* Channel Title */}
                <div className="flex flex-col gap-1 w-[80%] roboto-medium">
                  <h1 className="font-bold text-sm md:text-4xl">
                    {item?.name}
                  </h1>
                  {/* Channel Info */}
                  <div
                    id="Channel-info"
                    className="font-semibold md:font-normal flex flex-col md:flex-row md:gap-2 text-sm text-black md:text-[#707070]"
                  >
                    <span>@{item?.name}</span>
                    <div className="flex gap-1 text-[#707070] text-[11px] md:text-sm ">
                      <span>{item?.Subscriber_Count} Subscribers</span>
                      <span>{item?.videos?.length} Videos</span>
                    </div>
                  </div>
                  {/* //display on large screen size */}
                  <div className="text-sm font-medium  w-[80%] hidden md:flex">
                    <p className="line-clamp-1 text-[#707070]">
                      {item?.description}
                    </p>
                    <button className="font-semibold">...more.</button>
                  </div>
                  {item?.creator === user?.username ? (
                    <>
                      <h1 className="hidden md:flex text-[12px]">
                        You Can't Subscribe To Channel Beacuse You are the Owner
                      </h1>
                      <div className="flex gap-8 p-2">
                        <button className="font-bold text-sm flex items-center gap-1 text-blue-500 hover:text-[brown] active:text-black">
                          Edit Channel <FaPencil className="text-[12px]" />
                        </button>
                        <button className="font-bold text-sm flex items-center gap-1 hover:text-zinc-600 active:text-[brown]">
                          Delete Channel <FaTrash className="text-[11px]" />
                        </button>
                      </div>
                    </>
                  ) : (
                    //hide on small screen
                    <div className="md:flex w-fit hidden">
                      <SubscribeComponent
                        channels={user?.subscribed}
                        channelId={item?.name}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* //display on mobile screen size */}
              <div className=" text-[11px] md:text-sm font-medium  md:w-[80%] flex md:hidden">
                <p className="line-clamp-2 text-[#707070]">
                  {item?.description}
                </p>
                <button className="font-semibold">...more.</button>
              </div>
              {item?.creator === user ? (
                <h1 className="flex md:hidden roboto-medium text-[12px]">
                  You Can't Subscribe To Channel Beacuse You are the Owner
                </h1>
              ) : (
                <div className="w-full flex md:hidden">
                  <SubscribeComponent
                    channels={user?.subscribed}
                    channelId={item?.name}
                  />
                </div>
              )}
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
                {item?.videos.length == 0 ? (
                  item?.creator === user?.username && (
                    <div className="w-full h-full flex flex-col justify-center items-center p-5 gap-4">
                      <h1 className="text-sm md:text-2xl font-semibold roboto ">
                        No Videos Uploaded Yet
                      </h1>
                      <button className="border-2 p-2 font-medium flex items-center text-sm" onClick={()=>route("/upload")}>
                        Upload New Video <FaPlus />
                      </button>
                    </div>
                  )
                ) : (
                  <div className="flex w-full flex-wrap p-4 gap-6 justify-center">
                    {item?.creator === user?.username && (
                      <button className="border-2 p-2 font-medium flex items-center text-lg justify-center  w-[320px] hover:bg-zinc-100 active:bg-white rounded-lg" onClick={()=>route("/upload")}>
                        Upload New Video <FaPlus />
                      </button>
                    )}
                    {item?.videos.map((element) => {
                      return (
                        <div key={element}>
                          {VideoData.filter(
                            (elem) => elem?.title === element
                          ).map((val) => {
                            return (
                              <div
                                className="w-[320px] min-h-fit rounded-lg border shadow flex flex-col"
                                key={val._id}
                              >
                                <img
                                  src={val?.thumbnailUrl}
                                  className="h-[180px] rounded-lg"
                                  loading="lazy"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "/imageNotFound.jpg";
                                  }}
                                  onClick={() => route(`/video/${val?.title}`)}
                                />
                                <p
                                  className="text-sm roboto-medium p-2 cursor-pointer"
                                  onClick={() => route(`/video/${val?.title}`)}
                                >
                                  {val?.title}
                                </p>
                                <div className="flex gap-4 px-4 py-2 roboto-medium text-[12px] text-zinc-500">
                                  <p>{val?.views} Views .</p>
                                  <p>{val?.uploadDate} Day</p>
                                </div>
                                {val?.uploader === user?.username && (
                                  <div className="text-sm roboto-medium flex gap-12 justify-end p-2">
                                    <button className="flex items-center gap-1 text-blue-500 hover:text-[brown] active:text-black" onClick={()=>route(`/edit/${val?._id}`)}>
                                      Edit
                                      <FaPencil className="text-[11px]" />
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-zinc-600 active:text-[brown]">
                                      Delete <FaTrash className="text-[11px]" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        }
      )}
    </>
  );
}

export default ChannelPage;
