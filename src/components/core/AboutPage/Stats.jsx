import React from "react";

const StatsData = [
  {
    count: "5K",
    label: "Active Students",
  },
  {
    count: "10+",
    label: "Mentors",
  },
  {
    count: "200+",
    label: "Courses",
  },
  {
    count: "50+",
    label: "Awards",
  },
];

export const StatsComponent = () => {
  return (
    <div className="flex gap-6">
      {StatsData.map((stats, idx) => {
        return (
          <div key={idx}>
            {stats.count} {stats.label}
          </div>
        );
      })}
    </div>
  );
};
