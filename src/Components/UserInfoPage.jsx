import {  useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateChannelModal from "./CreateChannelModal";

const UserInfoPage = () => {

  const [visible, setVisible] = useState(false);

  //getting the user data from redux store

  return (
    <>
      <div className="h-[100dvh] w-full">
        <div className="flex h-[33dvh] items-center gap-2 bg-zinc-50/40 w-full p-5 md:p-12 justify-center">
          <img src="/User.png" className="rounded-full  w-[80px] h-[80px] flex items-center justify-center"/>
          <div className="flex flex-col font-semibold text-sm text-[#1f1e1e]">
            <p>{data?.fullname}</p>
            <p>{data?.email}</p>
          </div>
        </div>
        <div className="h-[33dvh] px-3 py-5 w-full shadow-md">
          <h1 className="font-semibold">My Channel</h1>
          {data?.channels ? (
            <div className="h-full w-full flex justify-center items-center">
              <button
                className="flex items-center gap-1 text-sm border-2 px-4 py-2 rounded font-semibold hover:bg-zinc-100 active:border-black"
                onClick={() => {
                  setVisible(!visible);
                  document.body.style.overflow="hidden"
                }}
              >
                Create New <FaPlus />
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="h-[33dvh] px-3 py-5">
          <h1 className="font-semibold">Subscribed Channels</h1>
          {data?.subscribed ? (
            <div className="h-full w-full flex justify-center items-center">
              <h1 className="flex items-center gap-1 font-semibold text-[#484747] p-6 bg-zinc-100 rounded">
                Not Subscribed to any Channel Yet
              </h1>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {visible && <CreateChannelModal  setVisible={setVisible}/>}
    </>
  );
};

export default UserInfoPage;
