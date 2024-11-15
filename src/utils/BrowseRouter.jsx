import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
const LoginComponent = lazy(() => import("../Components/LoginComponent"));
const SignupComponent = lazy(() => import("../Components/SignupComponent"));
const UserInfoPage = lazy(() => import("../Components/UserInfoPage"));
const ChannelPage = lazy(() => import("../Components/ChannelPage"));
const UploadVideoComponent = lazy(() =>
  import("../Components/UploadVideoComponent")
);
const VideoListComponent = lazy(() =>
  import("../Components/VideoListComponent")
);
const VideoPlayerComponent = lazy(() =>
  import("../Components/VideoPlayerComponent")
);
const SearchComponent = lazy(() => import("../Components/SearchComponent"));
const EditVideoComponent = lazy(() =>
  import("../Components/EditVideoComponent")
);
const HistoryComponent = lazy(() => import("../Components/HistoryComponent"));

import LoadingComponent from "../Components/LoadingComponent";
import NotFoundPageComponent from "../Components/NotFoundPageComponent";

export const BrowseRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPageComponent />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <VideoListComponent />
          </Suspense>
        ),
      },
      {
        path: "/video/:videoName",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <VideoPlayerComponent />
          </Suspense>
        ),
      },
      {
        path: "/user/:username",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <UserInfoPage />
          </Suspense>
        ),
      },
      {
        path: "/channel/:ChannelName",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <ChannelPage />
          </Suspense>
        ),
      },
      {
        path: "/search/:searchParams",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <SearchComponent />
          </Suspense>
        ),
      },
      {
        path: "/history",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <HistoryComponent />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <LoginComponent />
      </Suspense>
    ),
    errorElement: <NotFoundPageComponent />,
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <SignupComponent />
      </Suspense>
    ),
    errorElement: <NotFoundPageComponent />,
  },
  {
    path: "/upload/:channelId",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <UploadVideoComponent />
      </Suspense>
    ),
    errorElement: <NotFoundPageComponent />,
  },
  {
    path: "/edit/:videoId",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <EditVideoComponent />
      </Suspense>
    ),
    errorElement: <NotFoundPageComponent />,
  },
]);
