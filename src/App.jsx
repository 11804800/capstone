import { Outlet } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./Components/HeaderComponent";
import SidebarComponent from "./Components/SidebarComponent";

function App() {
  return (
    <div className="relative w-full h-full">
      <div>
          <HeaderComponent />
      </div>
      <div className="flex">
        <SidebarComponent/>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
