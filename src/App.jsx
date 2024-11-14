import { Outlet } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./Components/HeaderComponent";
import SidebarComponent from "./Components/SidebarComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetChannelError,
  SetChannelLoading,
  ShowChannels,
} from "./Redux/ChannelSlice";
import {
  SetVideoError,
  SetVideoLoading,
  ShowFilters,
  ShowVideos,
} from "./Redux/MediaSlice";
import axios from "axios";
import { SetError, SetLoading, ShowUserData } from "./Redux/UserSlice";

function App() {
  //state for toggling the sidebar menu
  const [sidebarvisible, setSidebarVisible] = useState(false);

  //getting state of user
  const user = useSelector((state) => {
    return state.user.user;
  });

  //user token for auth
  const token = useSelector((state) => {
    return state.user.token;
  });

  const dispatch = useDispatch();

  //useEffect for fetching data if the user changes and only if the user islogged in
  useEffect(() => {
    //function for getting user data
    async function GetUserData() {
      try {
        dispatch(SetLoading(true));
        const res = await axios.get(
          `http://localhost:3000/user?username=${user}`
        );
        //storing it as an object in the redux state
        dispatch(ShowUserData(res.data?.result));
        dispatch(SetLoading(false));
      } catch (err) {
        dispatch(SetError(err?.message));
        dispatch(SetLoading(false));
      }
    }

    //function for getting the channel data
    async function GetChannelData() {
      try {
        dispatch(SetChannelLoading(true));
        const res = await axios.get("http://localhost:3000/channel", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        dispatch(ShowChannels(res.data?.data));
        dispatch(SetChannelLoading(false));
      } catch (err) {
        dispatch(SetChannelError(err?.message));
        dispatch(SetChannelLoading(false));
      }
    }

    //for getting video data
    async function GetVideoData() {
      try {
        dispatch(SetVideoLoading(true));
        //getting data and authorizing by passing the jwt token stored in localstorage
        const res = await axios.get("http://localhost:3000/video", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        dispatch(ShowVideos(res.data?.video));
        dispatch(ShowFilters(res.data?.filterCategory));
        dispatch(SetVideoLoading(false));
      } catch (err) {
        dispatch(SetVideoError(err?.message));
        dispatch(SetVideoLoading(false));
      }
    }

    //only if the user is logged in the function will be called
    if (user) {
      GetUserData();
      GetChannelData();
      GetVideoData();
    }
  }, [user]);
  return (
    <div className="relative w-full h-full">
      <div>
        <HeaderComponent
          sidebarvisible={sidebarvisible}
          setSidebarVisible={setSidebarVisible}
        />
      </div>
      <div className="flex w-full gap-2">
        <div className={`${sidebarvisible && "md:w-[250px] w-full"}`}>
          {sidebarvisible && <SidebarComponent />}
        </div>
        <div
          className={`${
            sidebarvisible
              ? "md:w-[calc(100%-250px)] hidden md:flex "
              : "w-full"
          } overflow-hidden`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
