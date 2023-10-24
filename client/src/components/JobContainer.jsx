import React, { useContext } from "react";
import { AllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

function JobContainer() {
  const { data } = useContext(AllJobsContext);
  const { jobs, totalJobs, numOfPages } = data;
  if (jobs.length === 0) {
    return (
      <section className=" mt-16">
        <h2 className="form-title mb-8 text-3xl font-bold">
          No jobs to display....
        </h2>
      </section>
    );
  }
  return (
    <section className=" mt-16">
      <h5 className="form-title mb-8 text-3xl font-bold">
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className=" grid gap-8 grid-cols-1 xl:grid-cols-2">
        {jobs?.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </section>
  );
}

export default JobContainer;
