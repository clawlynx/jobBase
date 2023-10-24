import React, { createContext, useState } from "react";
import SmallSidebar from "../components/SmallSidebar";
import BigSidebar from "../components/BigSidebar";
import Navbar from "../components/Navbar";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

export const DashboardContext = createContext();

export default function DashboardLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { user } = useLoaderData(); //user is an object inside data object

  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  /* function toggleDarktheme() {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
  }*/

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  async function logoutUser() {
    navigate("/");
    await axios.get("/api/v1/auth/logout");
    toast.success("Logging out.....");
  }
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,

        toggleSidebar,
        logoutUser,
      }}
    >
      <div>
        <main className=" grid grid-cols-1 dashboardlayout">
          {/* grid to be added */}

          <SmallSidebar />

          <BigSidebar />

          <div className="">
            <Navbar />
            <div className=" logo my-0 mx-auto py-8 px-0 lg:w-11/12">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
}
