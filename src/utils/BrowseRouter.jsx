import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginComponent from "../Components/LoginComponent";
import SignupComponent from "../Components/SignupComponent";
import UserInfoPage from "../Components/UserInfoPage";

export const BrowseRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/user/:username",
        element: <UserInfoPage />,
      },
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
]);
