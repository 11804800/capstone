import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SubscribeComponent from "./Subscribe";
import { setHistory } from "../Redux/MediaSlice";
import { DaysFormat, formatNumber } from "../utils/Formats";

function SearchComponent() {
  const params = useParams();
  const route = useNavigate();
  const dispatch=useDispatch();

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
  const Video = videos?.filter((item) =>
    item?.title.includes(params?.searchParams)
  );
  const Channel = Channels?.filter((item) =>
    item?.name.includes(params?.searchParams)
  );

  return (
    <div className="w-full h-full px-4 py-10 flex flex-col gap-2 ">
      <p className="roboto-medium text-sm text-zinc-600">
        Showing Result for {params?.searchParams}
      </p>
      {Video?.length && Channel?.length ? (
        <div className="flex flex-col gap-2 h-full">
          {/* For channels if match the searchparams */}
          <div className="flex flex-col gap-4 p-2 w-full h-full ">
            {Channel.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex gap-4 md:gap-12 p-2 border-b w-full h-full md:h-[140px] xl:w-[80%] justify-between"
                >
                  {/* Channel Image */}
                  <div
                    className="w-[40%] flex justify-center items-center"
                    onClick={() => route(`/channel/${item?.name}`)}
                  >
                    <img
                      src={item?.image}
                      alt={item?.name}
                      width="100"
                      height="100"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/imageNotFound.jpg";
                      }}
                      className="rounded-full object-fill"
                    />
                  </div>
                  {/* Channel Description */}
                  <div className="flex gap-4 flex-col md:flex-row  justify-start   md:justify-between w-full xl:w-[60%] items-center overflow-hidden">
                    <div
                      className="flex flex-col gap-2 w-full"
                      onClick={() => route(`/channel/${item?.name}`)}
                    >
                      <p className="text-[12px] md:text-sm w-full roboto-bold">
                        {item?.name}
                      </p>
                      <div className="text-[12px] text-zinc-600 roboto-medium flex flex-col md:flex-row gap-2">
                        <p>@{item?.name}</p>
                        <p>{formatNumber(item?.Subscriber_Count)} Subscribers</p>
                      </div>
                      <p className="line-clamp-1 md:line-clamp-2 w-[80%] text-[12px] text-zinc-600 roboto-medium">
                        {item?.description}
                      </p>
                    </div>
                    {/* Subscribe Btn */}
                    <div className="w-fit">
                      <SubscribeComponent
                        channelId={item?.name}
                        channels={user?.subscribed}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* for videos if matched params */}
          <div className="flex flex-col gap-4 md:p-2 w-full h-full justify-center items-center">
            {Video.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex  flex-col md:flex-row gap-4 md:gap-12 md:p-2 h-full w-full  md:w-[80%] "
                  onClick={() => {
                    route(`/video/${item?.title}`);
                    dispatch(setHistory(item?._id));
                  }}
                >
                  {/* thumbnail Image */}
                  <div className="md:w-[320px] w-full">
                    <img
                      src={item?.thumbnailUrl}
                      className="w-full md:rounded-lg shadow"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/imageNotFound.jpg";
                      }}
                      alt={item?.title}
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
                        <p>{formatNumber(item?.views)} Views .</p>
                        <p>
                          {DaysFormat(item?.uploadDate)} days
                          ago
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <img
                        src={item?.channelId?.image}

                        className="rounded-full w-[40px] h-[40px]"
                      />
                      <div className="gap-1 items-center text-sm roboto-medium hidden md:flex">
                        <p>{item?.channelId.name}</p>
                        {
                          item?.channelId?.verified &&
                        <MdVerified />
                       }
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-5 border shadow-md rounded-lg flex flex-col gap-4 items-center justify-center">
          <p className="roboto-medium text-xl md:text-2xl ">
            Nothing Found related to {params?.searchParams}
          </p>
        </div>
      )}
    </div>
  );
}
export default SearchComponent;
