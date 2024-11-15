import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNewChannel } from "../../Redux/ChannelSlice";
import { addChannel } from "../../Redux/UserSlice";

function CreateChannelModal({ setVisible, user }) {
  //state for channel image
  const [image, setImage] = useState();
  //state for input
  const [channelInfo, setChannelInfo] = useState({
    name: user?.fullname,
    handle: user?.username,
  });
  const dispatch = useDispatch();

  const fileref = useRef();

  const token = useSelector((state) => {
    return state.user.token;
  });

  const channels=useSelector((state)=>{
    return state.channel.channels
  });


  //create new channel post axios function
  async function CreateChannel() {
    try {
      let formdata = new FormData();
      formdata.append("image", image);
      formdata.append("name", channelInfo?.handle);
      formdata.append("creator", user?.username);
      const res = await axios.post("http://localhost:3000/channel", formdata, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      //adding channel to the redux state
      dispatch(AddNewChannel(res.data?.result));
      if (channelInfo.handle) {
        const body = {
          id: channelInfo.handle,
        };
        const res1 = await axios.post(
          `http://localhost:3000/user/${user?.username}/channel`,body);
        //adding channel to user state
        dispatch(addChannel(channelInfo.handle));
        setVisible(false);
      }
    } catch (err) {
      console.log(err?.message);
    }
  }

  //on input change
  function OnInputChange(e) {
    setChannelInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="absolute top-0 left-0 bg-black/5 h-[100%] w-[100%] flex justify-center items-center">
      <div className="w-full h-full flex flex-col gap-2 p-2 md:p-4 rounded-md shadow-md border bg-white">
        <div className="flex justify-between w-full h-fit px-4 py-3 text-2xl font-semibold ">
          <h1>How You'll Appear</h1>
          <button
            className="border-black hover:border-2 rounded-md px-2 hover:bg-zinc-50/55"
            onClick={() => {
              setVisible(false);
            }}
          >
            &times;
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-4 items-center">
          <div className="flex flex-col justify-center items-center gap-3">
            <img
              src={image ? URL.createObjectURL(image) : "/User.png"}
              className="bg-red-200 rounded-full w-[120px] h-[120px]"
            />
            <button
              className="roboto-medium text-blue-700 hover:underline active:text-[brown] text-sm"
              onClick={() => {
                fileref.current.click();
              }}
            >
              Select Image
            </button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              ref={fileref}
            />
          </div>
          <div className="border-2 p-2 rounded-lg roboto-medium flex flex-col gap-2 w-[80%]">
            <label className="text-zinc-400 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="outline-none"
              name="name"
              value={channelInfo.name}
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div className="border-2 p-2 rounded-lg roboto-medium flex flex-col gap-2 w-[80%]">
            <label className="text-zinc-400 text-sm ">Handle</label>
            <input
              type="text"
              placeholder="Enter Your handle"
              className="outline-none"
              name="handle"
              value={channelInfo.handle}
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div className="text-[12px] roboto-medium text-zinc-400 flex justify-center items-center">
            <p className="w-[80%]">
              By Clicking create channel you aggree to{" "}
              <span className="text-blue-500">YouTube's Terms of Service </span>{" "}
              Changes made to your name and profile picture are visible only on
              Youtube and other services.{" "}
              <span className="text-blue-500">Learn More.</span>
            </p>
          </div>
          <div className="flex gap-5 roboto-medium w-full justify-end p-3">
            <button
              onClick={() => {
                setVisible(false);
                document.body.style.overflow = "auto";
              }}
            >
              Cancel
            </button>
            <button
              className="text-blue-500 hover:text-[brown] active:text-blue-600"
              onClick={CreateChannel}
            >
              Create Channel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateChannelModal;
