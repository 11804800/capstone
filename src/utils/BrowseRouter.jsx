import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginComponent from "../Components/LoginComponent"
import SignupComponent from "../Components/SignupComponent";

export const BrowseRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
    ]
  },
  {
    path:'/login',
    element:<LoginComponent/>
  },
  {
    path:"/signup",
    element:<SignupComponent/>
  }
]);
