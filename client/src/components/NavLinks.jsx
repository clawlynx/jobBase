import React, { useContext } from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { DashboardContext } from "../pages/DashboardLayout";

function NavLinks({ isBigSidebar }) {
  const { toggleSidebar, user } = useContext(DashboardContext);
  return (
    <div className="pt-8 flex flex-col">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === "admin" && role !== "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link flex items-center gap-2 text-textsecondary py-4 lg:ps-10 px-0 capitalize hover:text-primary"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="lg:text-2xl lg:me-4">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
