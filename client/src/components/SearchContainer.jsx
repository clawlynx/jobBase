import React, { useContext } from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import Formrow from "./Formrow";
import FormRowSelect from "./FormRowSelect";
import { JOB_SORT, JOB_STATUS, JOB_TYPES } from "../../../utils/constants";
import { AllJobsContext } from "../pages/AllJobs";
function SearchContainer() {
  const { searchValues } = useContext(AllJobsContext);
  const { search, jobStatus, jobType, sort } = searchValues;
  const submit = useSubmit();
  // function for sending request after 2sec in search query
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  //no method in form because of query
  return (
    <section className=" rounded w-full bg-gray-100 pt-12 pb-16 px-8">
      <Form className="m-0 rounded-none shadow-none p-0 max-w-full w-full">
        <h4 className="form-title mb-8 text-3xl font-bold">Search</h4>
        <div className="form-center grid gap-4">
          <Formrow
            type={"search"}
            name={"search"}
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText={"Job Status"}
            name={"jobStatus"}
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText={"Job Type"}
            name={"jobType"}
            list={["all", ...Object.values(JOB_TYPES)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText={"Sort By"}
            name={"sort"}
            list={[...Object.values(JOB_SORT)]}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link
            to={"/dashboard/all-jobs"}
            className="btn-primary form-btn mt-4 text-center flex items-center justify-center"
          >
            Reset Search
          </Link>
        </div>
      </Form>
    </section>
  );
}

export default SearchContainer;
