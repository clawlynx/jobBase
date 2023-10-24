import React from "react";

function StatItem({ count, title, icon, color, bgc }) {
  const bordercolor = {
    borderBottom: `5px solid ${color}`,
  };
  const countColor = {
    color: color,
  };
  const background = {
    backgroundColor: bgc,
  };
  return (
    <div className={`p-8 bg-gray-100 border-b-4 rounded `} style={bordercolor}>
      <header className="flex items-center justify-between">
        <span
          className="block text-5xl font-bold leading-loose"
          style={countColor}
        >
          {count}
        </span>
        <span
          className="w-16 h-14 rounded flex items-center justify-center bg-slate-400"
          style={background}
        >
          {icon}
        </span>
      </header>
      <h5 className="m-0 mt-2 capitalize text-left text-xl font-semibold">
        {title}
      </h5>
    </div>
  );
}

export default StatItem;
