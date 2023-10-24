import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";

export default function Landing() {
  return (
    <div>
      <nav className="logo flex items-center gap-5 max-w-6xl my-0 mx-auto h-24">
        <img src="main.png" className=" w-14 h-14" alt="image"></img>
        <h1 className=" text-primary text-3xl font-bold">JobBase</h1>
      </nav>
      <div className="my-0 mx-auto max-w-6xl grid lg:grid-cols-2 lg:gap-12 items-center -mt-12 pageLanding">
        <div>
          <h1 className=" font-bold text-5xl mb-6">
            Job <span className=" text-primary">Tracking</span> App
          </h1>
          <p className=" leading-loose text-textsecondary mb-6 max-w-lg">
            This is a job tracking app. You can keep track all of the jobs that
            you can get hold off in any location around the world and set its
            status to pending interviewed and rejected. everything at your
            fingertips
          </p>
          <Link to={"/register"} className="btn-primary py-3 px-4  me-4">
            Register
          </Link>
          <Link to={"/login"} className="btn-primary py-3 px-4 ">
            Login / Demo User
          </Link>
        </div>
        <img
          src={main}
          alt="jobhunt"
          className="w-full object-cover hidden lg:block"
        ></img>
      </div>
    </div>
  );
}
