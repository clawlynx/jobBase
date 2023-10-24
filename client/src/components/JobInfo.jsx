import React from "react";

function JobInfo({ icon, text }) {
  return (
    <div className=" flex items-center">
      <span className=" text-base me-4 flex items-center text-textsecondary">
        {icon}
      </span>
      <span className=" capitalize">{text}</span>
    </div>
  );
}

export default JobInfo;
