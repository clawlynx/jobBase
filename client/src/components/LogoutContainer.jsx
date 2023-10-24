import React, { useContext, useState } from "react";
import { DashboardContext } from "../pages/DashboardLayout";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

function LogoutContainer() {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useContext(DashboardContext);
  return (
    <div className=" relative">
      <button
        className="btn-primary py-2 px-3 flex items-center justify-center gap-2 min-w-fit"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-6 h-6 rounded-full"
          ></img>
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div
        className={`absolute top-11 left-0 w-full shadow-md text-center rounded bg-primary hover:bg-violet-800 ${
          showLogout ? "visible" : "invisible"
        }`}
      >
        <button
          type="button"
          className=" rounded p-2 text-white w-full h-full text-lg"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutContainer;
