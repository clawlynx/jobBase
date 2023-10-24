import React, { useContext } from "react";
import { FaAlignLeft } from "react-icons/fa";
import { DashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";

function Navbar() {
  const { toggleSidebar } = useContext(DashboardContext);
  return (
    <div className=" h-24 flex items-center justify-center shadow-md bg-white lg:sticky lg:top-0">
      <nav className="flex logo items-center justify-between lg:w-11/12">
        <button
          type="button"
          className=" bg-transparent border-transparent text-3xl text-primary cursor-pointer flex items-center"
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <div className="flex items-center justify-center gap-5 my-0 mx-auto mb-5 lg:hidden">
            <img src="main.png" className=" w-12  h-12" alt="image"></img>
            <h1 className=" text-primary text-2xl font-bold">JobBase</h1>
          </div>
          <h4 className=" hidden lg:block text-xl font-semibold">Dashboard</h4>
        </div>
        <div className=" flex items-center">
          <LogoutContainer />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
