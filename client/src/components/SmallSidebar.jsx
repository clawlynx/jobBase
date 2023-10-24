import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { DashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useContext(DashboardContext);
  return (
    <aside className=" lg:hidden block">
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="bg-white logo h-93 rounded py-16 px-8 relative flex items-center flex-col">
          <button
            type="button"
            className="absolute top-3 left-3 bg-transparent border-transparent text-2xl text-red-800 cursor-pointer"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <div className="flex items-center justify-center gap-5 my-0 mx-auto mb-5">
              <img src="main.png" className=" w-14 h-14" alt="image"></img>
              <h1 className=" text-primary text-3xl font-bold">JobBase</h1>
            </div>
          </header>
          <NavLinks />
        </div>
      </div>
    </aside>
  );
}

export default SmallSidebar;
