import { MdVerified } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHistory } from "../Redux/MediaSlice";
import { DaysFormat,FormatNumber } from "../utils/Formats";


function VideoItemComponent({ data }) {
  const route = useNavigate();
  const dispatch=useDispatch();

  return (
    <div
      className="w-[320px] flex flex-col gap-2"
      onClick={() => {
        route(`/video/${data?._id}`);
        dispatch(setHistory(data?._id));
      }}
    >
      <img
        src={data?.thumbnailUrl}
        className="rounded-lg shadow-md h-[180px]"
        loading="lazy"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = "/imageNotFound.jpg";
        }}
      />
      <div className="flex gap-2 p-2 items-center">
        <img
          src={data?.channelId.image}
          className="rounded-full w-[40px] h-[40px]"
          loading="lazy"
          alt={data?.channelId.name}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/imageNotFound.jpg";
          }}
        />
        <div>
          <p className="roboto-medium line-clamp-2 text-[13px]">
            {data?.title}
          </p>
          <p className="text-[12px] font-medium text-zinc-600 flex gap-1 items-center">
            {data?.channelId.name}
            {data?.channelId?.verified && <MdVerified />}
          </p>
          <p className="text-[12px] font-medium text-zinc-600">
            {FormatNumber(data?.views)} Views . {DaysFormat(data?.uploadDate)} days ago
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoItemComponent;
