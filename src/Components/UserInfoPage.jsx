import { useState } from "react";
import { FaPencil, FaPlus } from "react-icons/fa6";
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
  const route = useNavigate();

  const isLoading = useSelector((state) => {
    return state.user.loading;
  });
  
  const isError = useSelector((state) => {
    return state.user.err;
  });

  if (isLoading) {
    return (
      <div className="w-full h-[90dvh] flex justify-center items-center">
        <p className="roboto-medium">Loading...</p>
      </div>
    );
  } else if (isError) {
    return (
      <div className="w-full h-[90dvh] flex justify-center items-center">
        <p className="roboto-medium">{isError}</p>
      </div>
    );
  } else {
    return (
      <>
        <div className="h-[100%] w-full flex flex-col gap-2">
          <div className="flex h-fit flex-col gap-2 w-full border shadow rounded">
            <div className="w-full h-[180px] flex">
              <img src="/user_banner.png" className="w-full" />
            </div>
            <div className="flex gap-5 flex-col md:flex-row items-center px-2 py-1 ">
              {user?.avatar ? (
                <img
                  src={`http://localhost:3000/${user?.avatar}`}
                  alt="user_image"
                />
              ) : (
                <img
                  src="/User.png"
                  alt="user_image"
                  width="40"
                  height="40"
                  className="rounded-full"
                />
              )}
              <div className="flex gap-5 text-sm roboto-medium">
                <p>{user?.username}</p>
                <p>{user?.fullname}</p>
              </div>
            </div>
          </div>
          <div className="h-fit px-3 py-5 w-full shadow-md">
            <h1 className="font-semibold py-2 px-2">My Channel</h1>
            {user?.channels.length == 0 ? (
              <div className="h-[180px] w-full flex justify-center items-center">
                <button
                  className="flex items-center gap-1 text-sm border-2 px-4 py-2 rounded font-semibold hover:bg-zinc-100 active:border-black"
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  Create New <FaPlus />
                </button>
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto No-Scrollbar1 w-full">
                {user?.channels.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="min-w-fit p-2 border shadow-md rounded-lg"
                      onClick={() => route(`/channel/${item}`)}
                    >
                      {channels
                        ?.filter((elem) => elem?.name === item)
                        ?.map((val) => {
                          return (
                            <div
                              key={val?.name}
                              className="p-2 flex flex-col gap-2 justify-center items-center roboto-medium"
                            >
                              <img
                                src={val?.image}
                                className="h-[180px] w-[180px] object-cover rounded-full"
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
          <div className="h-[320px] px-3 py-5">
            <h1 className="font-semibold px-2 py-2">Subscribed Channels</h1>
            {user?.subscribed.length == 0 ? (
              <div className="h-full w-full flex justify-center items-center">
                <h1 className="flex items-center gap-1 font-semibold text-[#484747] p-6 bg-zinc-100 rounded">
                  Not Subscribed to any Channel Yet
                </h1>
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto No-Scrollbar1 w-full">
                {user?.subscribed.map((item) => {
                  return (
                    <div
                      key={item}
                      className="min-w-fit p-2 border shadow-md rounded-lg"
                      onClick={() => route(`/channel/${item}`)}
                    >
                      {channels
                        ?.filter((elem) => elem?.name === item)
                        ?.map((val) => {
                          return (
                            <div
                              key={val?._id}
                              className="p-2 flex flex-col gap-2 justify-center items-center roboto-medium"
                            >
                              <img
                                src={val?.image}
                                className="h-[180px] w-[180px] rounded-full"
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
  }
};

export default UserInfoPage;
