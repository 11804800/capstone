import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function SearchComponent() {
  const params = useParams();
  const route = useNavigate();

  //getting channel data
  const Channels = useSelector((state) => {
    return state.channel.channels;
  });

  //getting video data from store
  const videos = useSelector((state) => {
    return state.media.videos;
  });

  //getting userDATA FROM STORE
  const user = useSelector((state) => {
    return state.user.userData;
  });

  //filtering the video and channel data based on the search params
  //in case if nothing match to show nothing found
  const Video = videos.filter((item) =>
    item?.title.includes(params?.searchParams)
  );
  const Channel = Channels.filter((item) =>
    item?.name.includes(params?.searchParams)
  );

  return (
    <div className="w-full px-4 py-10">
      <p className="roboto-medium text-sm text-zinc-600">
        Showing Result for {params?.searchParams}
      </p>
      {/* For channels if match the searchparams */}
      <div className="flex flex-col gap-4 p-2 w-full justify-center items-center">
        {Channel.map((item) => {
          return (
            <div
              key={item._id}
              className="flex gap-4 md:gap-12 p-2 border-b w-full h-full md:h-[140px] md:w-[80%] justify-between"
            >
              {/* Channel Image */}
              <div className="w-[40%] flex justify-center items-center">
                <img
                  src={item?.image}
                  alt={item?.name}
                  width="100"
                  height="100"
                  className="rounded-full object-fill"
                />
              </div>
              {/* Channel Description */}
              <div className="flex gap-4 flex-col md:flex-row  justify-center  md:justify-between w-[60%] overflow-hidden">
                <div className="flex flex-col gap-2">
                  <p className="text-[12px] md:text-sm w-full roboto-bold">
                    {item?.name}
                  </p>
                  <div className="text-[12px] text-zinc-600 roboto-medium flex flex-col md:flex-row gap-2">
                    <p>@{item?.name}</p>
                    <p>{item?.Subscriber_Count} Subscribers</p>
                  </div>
                  <p className="line-clamp-1 md:line-clamp-2 w-[80%] text-[12px] text-zinc-600 roboto-medium">
                    {item?.description}
                  </p>
                </div>
                {/* Subscribe Btn */}
                <button>Subscribe</button>
              </div>
            </div>
          );
        })}
      </div>
      {/* for videos if matched params */}
      <div className="flex flex-col gap-4 md:p-2 w-full  justify-center items-center h-full">
        {Video.map((item) => {
          return (
            <div
              key={item._id}
              className="flex  flex-col md:flex-row gap-4 md:gap-12 md:p-2 h-full w-full  md:w-[80%] "
            >
              {/* thumbnail Image */}
              <div className="md:w-[320px] w-full">
                <img
                  src={item?.thumbnailUrl}
                  className="w-full md:rounded-lg shadow"
                />
              </div>
              {/* Video description */}
              <div className=" w-full md:w-[60%] p-2 flex flex-row-reverse md:flex-col  gap-2 items-start">
                {/* title */}
                <div className="w-full flex flex-col gap-1">
                  <p className="text-[13px] lg:text-lg md:text-md roboto-medium w-full">
                    {item?.title}
                  </p>
                  <div className="flex gap-2 text-[12px] text-zinc-600 roboto-medium">
                    <p className="flex md:hidden">
                      {item?.channelId?.name}
                    </p>
                    <p>
                      {item?.views} Views .
                    </p>
                    <p>
                      {
                        item?.uploadDate
                      }
                      ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={item?.channelId?.image} width="40" height="40" className="rounded-full"/>
                  <div className="gap-1 items-center text-sm roboto-medium hidden md:flex">
                    <p>{item?.channelId.name}</p>
                    <MdVerified/>
                  </div>
                </div>
                <p className="hidden md:flex line-clamp-1 text-[12px] roboto-medium text-zinc-600">{item?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* for nothing is found */}
      {Video.length == 0 ||
        (Channel.length == 0 && (
          <div className="p-5 border shadow-md rounded-lg flex flex-col gap-4 items-center justify-center">
            <p className="roboto-medium text-xl md:text-2xl ">
              Nothing Found related to {params?.searchParams}
            </p>
          </div>
        ))}
    </div>
  );
}
export default SearchComponent;
