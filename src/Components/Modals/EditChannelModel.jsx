import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateChannel } from "../../Redux/ChannelSlice";

function EditChannelModal({ setVisible, channelId }) {

  const dispatch=useDispatch();

  const user = useSelector((state) => {
    return state.user.userData;
  });

  const Channels = useSelector((state) => {
    return state.channel.channels;
  });

  const channel = Channels.filter((item) => item?.name == channelId)[0];

  //state for channel image
  const [image, setImage] = useState();
  const token = useSelector((state) => {
    return state.user.token;
  });

  //state for input
  const [channelInfo, setChannelInfo] = useState({
    handle: channel?.name,
    description:channel?.description
  });

  const fileRef=useRef();

  //on input change
  function OnInputChange(e) {
    setChannelInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  //edit channel function
  async function EditChannel()
  {
    //formdata
    const formdata=new FormData();
    formdata.append("image",image);
    formdata.append("name",channelInfo?.handle);
    formdata.append("description",channelInfo?.description);
    try
    {

      const res=await axios.put(`http://localhost:3000/channel/${channel?.name}`,formdata,
        {
          headers:{
            Authorization:`JWT ${token}`
          }
        }
      );
      dispatch(UpdateChannel(res?.data?.result));
      setVisible(false);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  return (
    <div className="absolute top-0 left-0 bg-black/5 h-full w-full flex justify-center ">
      <div className="w-full h-full  flex flex-col gap-2 p-2 md:p-4 rounded-md  bg-white">
        <div className="flex justify-between w-full h-full px-4 py-3 text-2xl font-semibold">
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
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-3 h-[130px]">
            <img
              src={image ? URL.createObjectURL(image) : channel?.image}
              className="bg-red-200 rounded-full w-[120px] h-[120px]"
              alt="channel image"
            />
            <button className="roboto-medium text-blue-700 hover:underline active:text-[brown] text-sm" onClick={()=>{
              fileRef.current.click()
            }}>
              Select Image
            </button>
            <input type="file" className="hidden" ref={fileRef} accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
          </div>
          <div className="flex flex-col gap-2 w-[80%]">
            <label className=" roboto-medium  text-sm ">Handle</label>
            <input
              type="text"
              placeholder="Enter Your handle"
              className="outline-none border-2 rounded-lg p-2 text-sm"
              name="handle"
              value={channelInfo.handle}
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div className="flex flex-col gap-2 w-[80%]">
            <label className="roboto-medium">Description</label>
            <textarea
              rows={4}
              value={channelInfo?.description}
              className="border-2 p-2 rounded-md text-sm"
              name="description"
              onChange={(e) => OnInputChange(e)}
            />
          </div>
          <div className="text-[12px] roboto-medium text-zinc-400 flex pt-4 justify-center items-center">
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
              }}
            >
              Cancel
            </button>
            <button className="text-blue-500 hover:text-[brown] active:text-blue-600" onClick={EditChannel}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditChannelModal;
