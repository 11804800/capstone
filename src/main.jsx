import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store.jsx";
import { RouterProvider } from "react-router-dom";
import { BrowseRouter } from "./utils/BrowseRouter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={BrowseRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
