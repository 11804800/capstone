import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PushVideo } from "../Redux/MediaSlice";
import { AddVideo } from "../Redux/ChannelSlice";

function UploadVideoComponent() {
  const params = useParams();
  const [visible, setVisible] = useState(false);
  const [video, setVideo] = useState();
  const [Input, setInput] = useState({
    title: "",
    description: "",
    Category: "",
  });

  const route = useNavigate();
  const token = useSelector((state) => {
    return state.user.token;
  });
  const user = useSelector((state) => {
    return state.user.user;
  });

  function OnInputChange(e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  //state for image
  const [image, setImage] = useState();
  //ref for input type file
  const fileRef = useRef();
  const videoInputRef=useRef();
  const dispatch = useDispatch();

  //post video function to post new video
  async function PostVideo() {
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("title", Input.title);
      formdata.append("description", Input.description);
      formdata.append("Category", Input.Category);
      formdata.append("uploader", user);
      formdata.append("channelId", params?.channelId);

      if (Input?.Category && Input?.title && image) {
        const res = await axios.post("http://localhost:3000/video", formdata, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        const body = {
          id: Input?.title,
        };
        //updating the channel video array
        await axios.post(
          `http://localhost:3000/channel/${params?.channelId}/video`,
          body,
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        dispatch(
          AddVideo({ channelId: params?.channelId, videoId: Input?.title })
        );
        setVisible(true);
      } else {
        alert("fill the form correctly");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function UploadVideo() {
    try {
      const formData = new FormData();
      formData.append("video", video);
      const res = await axios.put(
        `http://localhost:3000/video/${Input?.title}/upload`,
        formData,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      dispatch(PushVideo(res?.data?.result));
      setTimeout(() => {
        route(`/channel/${params.channelId}`);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-2 flex flex-col justify-center items-center w-full h-[100%]">
      {visible ? (
        <div className="flex flex-col justify-center items-center md:w-[80%]">
          <div className="w-full flex items-start p-4">
            <h1 className="text-xl md:text-2xl font-semibold">Upload Video</h1>
          </div>
          <div className="flex justify-center items-center flex-col gap-2 p-2">
            <video src={video && URL.createObjectURL(video)} controls className="w-[320px] md:w-[80%] h-[100%]" />
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideo(e.target.files[0])}
              ref={videoInputRef}
            />
            <button
              className="text-blue-500 roboto-medium text-sm hover:text-[brown] actie:text-blue-600"
              onClick={() => {
                videoInputRef.current.click();
              }}
            >
              Select Video
            </button>
          </div>
          <div className="flex w-full justify-end gap-4 p-3 roboto-medium">
            <button className="text-blue-500 border-2 shadow p-2 rounded-md active:shadow-none hover:shadow-sm" onClick={UploadVideo}>
              Upload
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center md:w-[80%]">
          <div className="w-full flex items-start p-4">
            <h1 className="text-xl md:text-2xl font-semibold">Upload Video</h1>
          </div>
          <div className="flex justify-center items-center flex-col gap-2 p-2">
            <img
              src={image ? URL.createObjectURL(image) : "/imageNotFound.jpg"}
              className="w-[300px] h-[200px] rounded-md"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
              ref={fileRef}
            />
            <button
              className="text-blue-500 roboto-medium text-sm hover:text-[brown] actie:text-blue-600"
              onClick={() => {
               fileRef.current.click();
              }}
            >
              Select Thumbnail
            </button>
          </div>
          <div className="flex flex-col gap-2 w-full p-2 roboto">
            <label className="font-semibold">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title for video"
              className="border-2 rounded-md p-2"
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div className="flex flex-col  gap-2 w-full p-2 roboto">
            <label className="font-semibold">Category</label>
            <input
              type="text"
              name="Category"
              placeholder="Ex- Podcast Education Music etc."
              className="border-2 rounded-md p-2"
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2 w-full p-2 roboto">
            <label className="font-semibold">Description</label>
            <textarea
              rows={4}
              cols={2}
              className="border-2 rounded-md p-2"
              name="description"
              placeholder="Enter Something ..."
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div className="flex w-full justify-end gap-4 p-3 roboto-medium">
            <button onClick={() => route(`/channel/${params.channelId}`)}>
              Cancel
            </button>
            <button className="text-blue-500" onClick={PostVideo}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default UploadVideoComponent;
