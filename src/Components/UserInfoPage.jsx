import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateChannelModal from "./Modals/CreateChannelModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserInfoPage = () => {
  const [visible, setVisible] = useState(false);

  //getting the user data from redux store
  const user = useSelector((state) => {
    return state.user.userData;
  });

  const channels = useSelector((state) => {
    return state.channel.channels;
  });

  //hook for navigation
  const route=useNavigate();

  return (
    <>
      <div className="h-[100dvh] w-full ">
        <div className="flex h-[33dvh] items-center gap-2 bg-zinc-50/40 w-full p-5 md:p-12 justify-center">
          {user?.avatar ? (
            <img
              src={`http://localhost:3000/${user?.avatar}`}
              className="shadow-md rounded-lg w-[200px] h-[200px] flex items-center justify-center"
            />
          ) : (
            <img
              src="/User.png"
              className="shadow-md rounded-lg w-[200px] h-[200px] flex items-center justify-center"
            />
          )}
          <div className="flex flex-col font-semibold text-sm text-[#1f1e1e]">
            <p>Name: {user?.fullname}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
        <div className="h-fit px-3 py-5 w-full shadow-md">
          <h1 className="font-semibold py-2 px-2">My Channel</h1>
          {user?.channels.length == 0 ? (
            <div className="h-full w-full flex justify-center items-center">
              <button
                className="flex items-center gap-1 text-sm border-2 px-4 py-2 rounded font-semibold hover:bg-zinc-100 active:border-black"
                onClick={() => {
                  setVisible(!visible);
                  document.body.style.overflow = "hidden";
                }}
              >
                Create New <FaPlus />
              </button>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto No-Scrollbar1 w-full">
              {user?.channels.map((item) => {
                return (
                  <div className="min-w-fit p-2 border shadow-md rounded-lg" onClick={()=>route(`/channel/${item}`)}>
                    {channels
                      ?.filter((elem) => elem?.name === item)
                      ?.map((val) => {
                        return (
                          <div className="p-2 flex flex-col gap-2 justify-center items-center roboto-medium">
                            <img
                              src={val?.image}
                              className="h-[180px]"
                              loading="lazy"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/imageNotFound.jpg";
                              }}
                            />
                            <p>{val?.name}</p>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="h-[33dvh] px-3 py-5">
          <h1 className="font-semibold px-2 py-2">Subscribed Channels</h1>
          {user?.subscribed.length==0 ? (
            <div className="h-full w-full flex justify-center items-center">
              <h1 className="flex items-center gap-1 font-semibold text-[#484747] p-6 bg-zinc-100 rounded">
                Not Subscribed to any Channel Yet
              </h1>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto No-Scrollbar1 w-full">
              {user?.subscribed.map((item) => {
                return (
                  <div className="min-w-fit p-2 border shadow-md rounded-lg" onClick={()=>route(`/channel/${item}`)}>
                    {channels
                      ?.filter((elem) => elem?.name === item)
                      ?.map((val) => {
                        return (
                          <div className="p-2 flex flex-col gap-2 justify-center items-center roboto-medium">
                            <img
                              src={val?.image}
                              className="h-[180px]"
                              loading="lazy"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/imageNotFound.jpg";
                              }}
                            />
                            <p>{val?.name}</p>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {visible && <CreateChannelModal setVisible={setVisible} user={user} />}
    </>
  );
};

export default UserInfoPage;
