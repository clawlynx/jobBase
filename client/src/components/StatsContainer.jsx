import React from "react";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import StatItem from "./StatItem";

function StatsContainer({ defaultStats }) {
  const stats = [
    {
      title: "Pending Applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling size={"2rem"} />,
      color: "#f59e0b",
      bgc: "#fef3c7",
    },
    {
      title: "Interviews Scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck size={"2rem"} />,
      color: "#647acb",
      bgc: "#e0e8f9",
    },
    {
      title: "Jobs Declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug size={"2rem"} />,
      color: "#d66a6a",
      bgc: "#ffeeee",
    },
  ];
  return (
    <section className="grid gap-8 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </section>
  );
}

export default StatsContainer;
