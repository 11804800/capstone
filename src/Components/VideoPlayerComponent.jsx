import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SubscribeComponent from "./Subscribe";
import CommentComponent from "./CommentComponent";

function VideoPlayerComponent() {
  const params = useParams();
  const Videos = useSelector((state) => {
    return state.media.videos;
  });

  const video = Videos.filter((item) => item?.title === params?.videoName)[0];
  const user = useSelector((state) => {
    return state.user.userData;
  });

  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-2 p-2 w-full">
        <iframe
          src={video?.Url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-[100%] h-[50dvh] md:h-[80dvh] object-contain"
        ></iframe>
        <div className="flex flex-col gap-2">
          <p className="roboto-medium text-sm md:text-lg line-clamp-2">
            {video?.title}
          </p>

          <div className="flex flex-col gap-3 w-full">
            {/* channel info */}

            <div className="w-full">
              <div className="flex gap-5">
                <div className="flex gap-2">
                  <img
                    src={video?.channelId?.image}
                    width="40"
                    height="40"
                    className="rounded-full"
                  />
                  <div className="flex flex-col roboto-medium">
                    <div className="text-sm flex items-center gap-1">
                      <p>{video?.channelId?.name}</p>
                      <MdVerified />
                    </div>
                    <p className="text-[12px] text-zinc-600">
                      {video?.channelId.Subscriber_Count} Subscribers
                    </p>
                  </div>
                </div>
                <div className="w-fit">
                  <SubscribeComponent
                    channelId={video?.channelId?.name}
                    channels={user?.subscribed}
                  />
                </div>
              </div>
              {/* for like and dislike share btn */}
              <div></div>
            </div>
            {/* video info */}
            <div className="bg-zinc-100 p-2 rounded-lg flex flex-col gap-2 md:w-[80%]">
              <div className="flex gap-5 roboto-medium">
                <p>{video?.views} Views</p>
                <p>{video?.uploadDate}</p>
              </div>
              <div className="roboto-medium text-sm  flex items-end">
                <p className="line-clamp-2 text-zinc-700">
                  {video?.description}
                </p>
                <button>More..</button>
              </div>
            </div>
            {/* for comments */}
            <CommentComponent videoId={video?._id} comments={video?.comments} />
            {/* for video with same channels and category */}
            <div className="flex flex-col gap-4 md:p-2 w-full h-full justify-center items-center">
              <h1 className="roboto-medium">Similar Category</h1>
              {Videos.filter((item)=>item?.Category==video?.Category).map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex  flex-col md:flex-row gap-4 md:gap-12 md:p-2 h-full w-full  md:w-[80%] "
                    onClick={() => route(`/video/${item?.title}`)}
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
                          <p>{item?.views} Views .</p>
                          <p>
                            {item?.uploadDate}
                            ago
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <img
                          src={item?.channelId?.image}
                          width="40"
                          height="40"
                          className="rounded-full"
                        />
                        <div className="gap-1 items-center text-sm roboto-medium hidden md:flex">
                          <p>{item?.channelId.name}</p>
                          <MdVerified />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerComponent;
