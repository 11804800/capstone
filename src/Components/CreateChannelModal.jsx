import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

function CreateChannelModal({ setVisible }) {
  const [image, setImage] = useState("/User.png");
  return (
    <div className="absolute top-0 left-0 bg-black/5 h-[100dvh] w-[100dvw] flex justify-center items-center">
      <div className="w-full h-full md:w-[80%] md:h-[85%] flex flex-col gap-2 p-2 md:p-4 rounded-md shadow-md border bg-white">
        <div className="flex justify-between w-full px-4 py-3 text-2xl font-semibold">
          <h1>How You'll Appear</h1>
          <button
            className="border-black hover:border-2 rounded-md px-2 hover:bg-zinc-50/55"
            onClick={() => {
              setVisible(false);
              document.body.style.overflow = "auto";
            }}
          >
            &times;
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={image} className="bg-red-200 rounded-full w-[120px]" />
            <button className="roboto-medium text-blue-700 hover:underline active:text-[brown] text-sm">
              Select Image
            </button>
            <imput type="file" className="hidden" />
          </div>
          <div className="border-2 p-2 rounded-lg roboto-medium flex flex-col gap-2 w-[80%]">
            <label className="text-zinc-400 text-sm">Name</label>
            <input type="text" placeholder="Enter Your Name" className="outline-none" />
          </div>
          <div className="border-2 p-2 rounded-lg roboto-medium flex flex-col gap-2 w-[80%]">
            <label className="text-zinc-400 text-sm ">Handle</label>
            <input type="text" placeholder="Enter Your handle" className="outline-none"/>
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
            <button className="text-blue-500">Create Channel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateChannelModal;
