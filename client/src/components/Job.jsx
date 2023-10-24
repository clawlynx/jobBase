import React from "react";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import JobInfo from "./JobInfo";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import { Form, Link } from "react-router-dom";
day.extend(advancedFormat);

function Job({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  jobStatus,
  createdAt,
}) {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <article className="jobcomponent bg-gray-100 rounded shadow-md">
      <header className="jobheader py-4 px-6 border-b border-gray-100 items-center">
        <div className="w-14 h-14 grid place-items-center bg-primary rounded-full text-2xl font-bold text-white me-8">
          {company?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h5 className="mb-2 text-xl">{position}</h5>
          <p className="m-0 capitalize text-textsecondary">{company}</p>
        </div>
      </header>
      <div className=" py-4 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 mb-6 gap-6 items-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div
            className={` rounded capitalize text-center w-24 h-7 grid items-center ${jobStatus}`}
          >
            {jobStatus}
          </div>
        </div>
        <footer className="mt-4 flex items-center">
          <Link
            to={`../edit-job/${_id}`}
            className="btn-primary px-4 h-7 text-sm flex items-center mr-2"
          >
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button
              type="submit"
              className="btn-primary px-4 h-7 text-sm flex items-center"
            >
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </article>
  );
}

export default Job;
