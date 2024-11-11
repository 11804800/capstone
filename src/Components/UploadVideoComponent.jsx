import { useState } from "react";

function UploadVideoComponent() {
   
  const [Input, setInput] = useState({
    title: "",
    description: "",
  });

  function OnInputChange(e) {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="p-2 flex flex-col justify-center items-center w-full h-[100dvh]">
      <div className="flex flex-col justify-center items-center md:w-[80%]">
        <div className="w-full flex items-start p-4">
          <h1 className="text-xl md:text-2xl font-semibold">Upload Video</h1>
        </div>
        <div className="flex justify-center items-center flex-col gap-2 p-2">
          <img
            src="/imageNotFound.jpg"
            className="w-[300px] h-[200px] rounded-md"
          />
          <input
            type="file"
            accept=".png,.jpeg,.jpg,.webp"
            className="hidden"
          />
          <button className="text-blue-500 roboto-medium text-sm">
            Select thumbnail
          </button>
        </div>
        <div className="flex gap-12  roboto-medium w-full p-2 text-sm">
          <label>Video</label>
          <input type="file" className="hidden"/>
          <button className="text-blue-500">
            Select Video
          </button>
          <button className="text-blue-500">Preview</button>
        </div>
        <div className="flex flex-col gap-2 w-full p-2 roboto">
          <label className="font-semibold">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title for video"
            className="border-2 rounded-md p-2"
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
          <button>Cancel</button>
          <button
            className="text-blue-500"
            onClick={() => alert(Input?.description)}
          >
           Upload
          </button>
        </div>
      </div>
    </div>
  );
}
export default UploadVideoComponent;
