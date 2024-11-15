import axios from "axios";
import { useRef, useState } from "react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { EditComments, PushComment, RemoveComment } from "../Redux/MediaSlice";

//edit comment form modal
//you cannot edit the immedately posted comment until you refresh it
function EditCommentForm({ UpdateComment, comment, setVisible }) {
  const [text, setText] = useState(comment?.text);
  function EditComment() {
    if (text) {
      UpdateComment(text);
      setVisible(false);
      document.body.style.overflow = "auto";
    } else {
      alert("comment can't be empty");
    }
  }

  return (
    <div className="absolute top-0 left-0 w-[100%] h-[100dvh] bg-black/20 flex justify-center items-center z-[999]">
      <div className="px-5 py-12 rounded-lg shadow flex flex-col gap-4 bg-white w-[320px]">
        {
          text &&
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-b-2 border-black p-2"
          />
        }{" "}
        <div className="flex justify-end w-full gap-5 roboto-medium text-sm">
          {/* this button will hide the button div and comments list */}
          <button
            onClick={() => {
              setVisible(false);
              document.body.style.overflow = "auto";
            }}
          >
            Cancel
          </button>
          <button
            className="bg-zinc-100 p-2 rounded-lg active:bg-zinc-200 hover:bg-zinc-200"
            onClick={EditComment}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function CommentComponent({ comments, videoId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [err, SetError] = useState(false);
  const [comment, setComment] = useState();

  const user = useSelector((state) => {
    return state.user.userData;
  });
  const token = useSelector((state) => {
    return state.user.token;
  });
  const [visible, setVisible] = useState(false);

  const btnref = useRef();
  const commentref = useRef();

  // posting new comment
  async function PostComment() {
    const body = {
      text: text,
      userId: user?.username,
    };
    try {
      if (text) {
        const res = await axios.post(
          `http://localhost:3000/video/${videoId}/comment`,
          body,
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        dispatch(
          PushComment({
            videoId,
            comments: {
              userId: {
                avatar: user?.avatar,
                username: user?.username,
                _id: user?._id,
              },
              text: text,
              _id: Math.floor(Math.random()),
            },
          })
        );
        setText("");
      } else {
        SetError(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  //deletecomment function for deleting the by id
  async function DeleteComment(commentId) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/video/${videoId}/comment/${commentId}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      dispatch(RemoveComment({ videoId, commentId }));
    } catch (err) {
      console.log(err);
    }
  }

  //updating the comment it is actually a callback function
  async function UpdateComment(commentText) {
    const body = {
      text: commentText,
    };
    try {
      const res = await axios.put(
        `http://localhost:3000/video/${videoId}/comment/${comment?._id}`,
        body,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );

      dispatch(EditComments({ videoId, comments: res?.data?.video }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-2 py-2 px-1 ">
        <h1 className="roboto-medium text-sm md:text-xl ">
          {comments?.length} Comments
        </h1>
        <div className="flex w-full items-center gap-2">
          <img
            src="/User.png"
            width="35"
            height="35"
            className="rounded-full"
          />
          {/* onFocus the comment input it will show the comment list */}
          <input
            type="text"
            name="comment"
            onChange={(e) => setText(e.target.value)}
            onFocus={() => {
              btnref.current.style.display = "flex";
              commentref.current.style.display = "flex";
            }}
            value={text}
            placeholder="Add a Comment"
            className="w-full md:w-[70%] outline-none border-b-2 text-sm border-black"
          />
          {err && !text && (
            <p className="text-[12px] roboto-medium text-[brown]">Required</p>
          )}
        </div>
        <div
          ref={btnref}
          className="hidden justify-end w-full md:w-[80%] gap-5 roboto-medium text-sm"
        >
          {/* this button will hide the button div and comments list */}
          <button
            onClick={() => {
              btnref.current.style.display = "none";
              commentref.current.style.display = "none";
            }}
          >
            Cancel
          </button>
          <button className="bg-zinc-100 p-2 rounded-lg" onClick={PostComment}>
            Comment
          </button>
        </div>
        {/* Comments list */}
        <div className="hidden flex-col gap-4 py-2" ref={commentref}>
          {comments?.map((item) => {
            return (
              <div className="flex gap-2 items-start" key={item?._id}>
                {item?.userId?.avatar ? (
                  <img src={item?.userId.avatar} />
                ) : (
                  <img src="/User.png" width="30" className="rounded-full" />
                )}
                <div className="flex flex-col gap-2 text-sm roboto-medium">
                  <p className="text-[12px]">@{item?.userId.username}</p>
                  <p>{item?.text}</p>
                  <div className="flex gap-2 items-center text-[12px] roboto-medium">
                    <MdOutlineThumbUp />
                    <MdOutlineThumbDown />
                    <p>Reply</p>
                  </div>
                  {item?.userId?.username == user?.username && (
                    <div className="flex gap-5 roboto-medium items-center">
                      <button
                        className="text-blue-600 hover:text-[brown] active:text-blue-600 text-[12px]"
                        onClick={() => {
                          setComment(item);
                          setVisible(!visible);
                          document.body.style.overflow = "hidden";
                          window.scrollTo(0, 0);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className=" hover:text-[brown] active:text-black text-[12px]"
                        onClick={() => {
                          DeleteComment(item?._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="flex justify-end w-full">
            <button
              className="text-[12px] roboto-medium"
              onClick={() => {
                btnref.current.style.display = "none";
                commentref.current.style.display = "none";
              }}
            >
              Show Less
            </button>
          </div>
        </div>
      </div>
      {visible && (
        <EditCommentForm
          setVisible={setVisible}
          UpdateComment={UpdateComment}
          comment={comment}
        />
      )}
    </>
  );
}

export default CommentComponent;
