import React, { useContext } from "react";
import { DashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";

function BigSidebar() {
  const { showSidebar } = useContext(DashboardContext);
  return (
    <aside className="hidden lg:block bgside-shadow">
      <div
        className={
          showSidebar
            ? "big-sidebar-container "
            : "big-sidebar-container show-big-sidebar"
        }
      >
        <div className="lg:sticky lg:top-0">
          <header className=" lg:h-24 lg:flex lg:items-center">
            <div className="flex items-center justify-center gap-5 my-0 mx-auto mb-5">
              <img src="main.png" className=" w-12 h-12" alt="image"></img>
              <h1 className=" text-primary text-2xl font-bold">JobBase</h1>
            </div>
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </aside>
  );
}

export default BigSidebar;
