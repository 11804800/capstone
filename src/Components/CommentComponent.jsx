import { useRef, useState } from "react";
import { useSelector } from "react-redux";

function CommentComponent({ comments, videoId }) {
  const [text, setText] = useState();
  const user = useSelector((state) => {
    return state.user.userData;
  });
  const btnref = useRef();

  return (
    <div className="w-full flex flex-col gap-2 py-2 px-1 ">
      <h1 className="roboto-medium text-sm md:text-xl ">
        {comments?.length} Comments
      </h1>
      <div className="flex w-full items-center gap-2">
        <img src="/User.png" width="35" height="35" className="rounded-full" />
        <input
          type="text"
          name="comment"
          onChange={(e) => setText(e.target.value)}
          onFocus={() => (btnref.current.style.display = "flex")}
          placeholder="Add a Comment"
          className="w-full md:w-[70%] outline-none border-b-2 text-sm border-black"
        />
      </div>
      <div
        ref={btnref}
        className="hidden justify-end w-full md:w-[80%] gap-5 roboto-medium text-sm"
      >
        <button
          onClick={() => {
            btnref.current.style.display = "none";
          }}
        >
          Cancel
        </button>
        <button className="bg-zinc-100 p-2 rounded-lg">Comment</button>
      </div>
      {/* Comments list */}
    </div>
  );
}

export default CommentComponent;
