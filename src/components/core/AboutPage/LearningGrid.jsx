import React from "react";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

export const LearningGrid = () => {
  return (
    <div className="grid grid-cols-4">
      {LearningGridArray.map((grid, idx) => {
        return (
          <div key={idx} className={`${grid.order === -1 && "col-span-2"} ${grid.order%2 === 1 ? "bg-richblack-700" : grid.order%2 === 0 ? "bg-richblack-800" : "bg-transparent"}  ${grid.order === 3 && "col-start-2"} ` }>
            {grid.heading} {grid.description}
          </div>
        );
      })}
    </div>
  );
};
