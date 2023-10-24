import React from "react";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <div className=" min-h-screen text-center flex items-center justify-center">
        <div>
          <img
            src={img}
            alt="not found"
            className="logo max-w-2xl block mb-8 -mt-12"
          ></img>
          <h3 className=" mb-2">ohh! page not found.</h3>
          <p className=" leading-normal mt-2 mb-4 text-textsecondary ">
            we cant find the page you are looking for
          </p>
          <Link className="text-primary capitalize" to={"/dashboard"}>
            back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen text-center flex items-center justify-center">
      <div>
        <h3 className=" mb-2">Something went wrong</h3>
      </div>
    </div>
  );
}
