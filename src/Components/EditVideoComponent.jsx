import axios from "axios";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EditVideo } from "../Redux/MediaSlice";

function EditVideoComponent() {
  const params = useParams();
  const route = useNavigate();
  const dispatch = useDispatch();

  const video = useSelector((state) => {
    return state.media.videos;
  });

  const token = useSelector((state) => {
    return state.user.token;
  });

  const Videos = video.filter((item) => item._id == params?.videoId)[0];

  const [videoData, setVideoData] = useState({
    image: Videos?.thumbnailUrl,
    title: Videos?.title,
    description: Videos?.description,
  });

  function OnInputChange(e) {
    setVideoData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  //function to upate the video
  async function UpdateVideo() {
    const body = {
      thumbnailUrl: videoData?.image,
      title: videoData?.title,
      description: videoData?.description,
    };

    try {
        const res=await axios.put(`http://localhost:3000/video/${Videos._id}`,{
            headers:{
                Authorization:`JWT ${token}`
            },
            body:body
        });
        console.log(res.data?.result);
        dispatch(EditVideo(res.data?.result));
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full h-full">
      <div className="px-5 py-4 flex flex-col gap-5 roboto-medium w-full">
        <button
          className="flex gap-1 items-center text-sm"
          onClick={() => route(`/channel/${Videos.channelId.name}`)}
        >
          <BsArrowLeft />
          Back
        </button>
      </div>
      <div className="w-full md:w-[80%]  flex flex-col gap-4 p-4">
        <p className="text-lg roboto-medium">Edit Video</p>
        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center w-full flex-col gap-2 roboto">
            <img
              src={videoData?.image}
              alt="thumbnail Image"
              className="w-[320px] rounded-lg"
            />
            <button className="text-blue-600 text-sm hover:underline roboto-medium active:text-[brown]">
              Change Thumbnail
            </button>
          </div>
          <label className="roboto-medium">title</label>
          <input
            type="text"
            value={videoData?.title}
            className="border-2 p-2 rounded-md text-sm"
            name="title"
            onChange={(e) => OnInputChange(e)}
          />
          <label className="roboto-medium">Description</label>
          <textarea
            rows={4}
            value={videoData?.description}
            className="border-2 p-2 rounded-md text-sm"
            name="description"
            onChange={(e) => OnInputChange(e)}
          />
          <div className="p-2 w-full h-full flex gap-8 justify-end text-sm roboto-medium">
            <button
              onClick={() => route(`/channel/${Videos.channelId.name}`)}
              className="hover:text-[brown]"
            >
              Cancel
            </button>
            <button
              className="text-blue-600 hover:text-[brown]"
              onClick={UpdateVideo}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditVideoComponent;
