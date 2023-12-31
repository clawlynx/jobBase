import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Admin,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  EditJob,
  DeleteJob,
} from "./pages";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { action as editJobAction } from "./pages/EditJob";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          loader: dashboardLoader,
          children: [
            {
              index: true,
              element: <AddJob />,
              action: addJobAction,
            },
            {
              path: "admin",
              element: <Admin />,
              loader: adminLoader,
            },
            {
              path: "stats",
              element: <Stats />,
              loader: statsLoader,
            },
            {
              path: "all-jobs",
              element: <AllJobs />,
              loader: allJobsLoader,
            },
            {
              path: "edit-job/:id",
              element: <EditJob />,
              action: editJobAction,
              loader: editJobLoader,
            },
            {
              path: "delete-job/:id",

              action: deleteJobAction,
            },
            {
              path: "profile",
              element: <Profile />,
              action: profileAction,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
