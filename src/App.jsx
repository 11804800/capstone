import { Outlet } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./Components/HeaderComponent";
import SidebarComponent from "./Components/SidebarComponent";
import { useState } from "react";

function App() {
  //state for toggling the sidebar menu
  const [sidebarvisible, setSidebarVisible] = useState(true);

  return (
    <div className="relative w-full h-full">
      <div>
        <HeaderComponent
          sidebarvisible={sidebarvisible}
          setSidebarVisible={setSidebarVisible}
        />
      </div>
      <div className="flex">
        {sidebarvisible && <SidebarComponent />}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
