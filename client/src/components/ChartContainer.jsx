import React, { useState } from "react";
import Areachart from "./AreaChart";
import BarChartComponent from "./BarChart";

function ChartContainer({ data }) {
  const [barChart, setBarChart] = useState(true);
  return (
    <section className="mt-16 text-center">
      <h4 className="text-center text-3xl mb-3">Monthly Applications</h4>
      <button
        type="button"
        className=" bg-transparent border-transparent capitalize text-primary text-xl cursor-pointer"
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <Areachart data={data} />}
    </section>
  );
}

export default ChartContainer;
