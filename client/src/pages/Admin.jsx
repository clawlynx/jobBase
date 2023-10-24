import axios from "axios";
import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import StatItem from "../components/StatItem";
import { FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/users/admin/app-stats");
    return data;
  } catch (error) {
    toast.error("You are not authorised to view this page");
    return redirect("/dashboard");
  }
};

export default function Admin() {
  const { users, jobs } = useLoaderData();

  return (
    <section className="grid gap-8 md:grid-cols-2 md:gap-4 xl:grid-cols-3 ">
      <StatItem
        title={"Current Users"}
        count={users}
        color={"#e9b949"}
        bgc={"#fcefc7"}
        icon={<FaSuitcaseRolling size={"2rem"} />}
      />
      <StatItem
        title={"Total jobs"}
        count={jobs}
        color={"#647acb"}
        bgc={"#e0e8f9"}
        icon={<FaCalendarCheck size={"2rem"} />}
      />
    </section>
  );
}
