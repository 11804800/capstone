import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginComponent from "../Components/LoginComponent";
import SignupComponent from "../Components/SignupComponent";
import UserInfoPage from "../Components/UserInfoPage";
import ChannelPage from "../Components/ChannelPage";
import UploadVideoComponent from "../Components/UploadVideoComponent";
import VideoListComponent from "../Components/VideoListComponent";
import VideoPlayerComponent from "../Components/VideoPlayerComponent";
export const BrowseRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:'/',
        element:<VideoListComponent/>
      },
      {
        path:"/video/:videoName",
        element:<VideoPlayerComponent/>
      },
      {
        path: "/user/:username",
        element: <UserInfoPage />,
      },
      {
        path:"/channel/:ChannelName",
        element:<ChannelPage/>
      }
    ],
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/signup",
    element: <SignupComponent />,
  },
  {
    path:"/upload",
    element:<UploadVideoComponent/>
  }
]);
