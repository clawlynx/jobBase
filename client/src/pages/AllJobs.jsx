import axios from "axios";
import React, { createContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import SearchContainer from "../components/SearchContainer";
import JobContainer from "../components/JobContainer";

export const loader = async ({ request }) => {
  //for getting the query values from search
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await axios.get("/api/v1/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const AllJobsContext = createContext();
export default function AllJobs() {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
}
