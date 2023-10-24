import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import StatsContainer from "../components/StatsContainer";
import ChartContainer from "../components/ChartContainer";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/jobs/stats");
    return data;
  } catch (error) {
    return error;
  }
};

export default function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications.length > 1 && (
        <ChartContainer data={monthlyApplications} />
      )}
    </>
  );
}
