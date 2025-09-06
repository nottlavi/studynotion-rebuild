import React from "react";
import { HighlightText } from "./HighlightText";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "../../core/HomePage/Button";

export const LearningLanguageSection = () => {
  return (
    // Removed bottom margin (was my-40) to avoid margin-collapsing with parent
    // that exposed the page's dark background between this section and Instructor.
    <div className="flex flex-col justify-center items-center mt-40">
      <div className="text-4xl font-extrabold">
        Your swiss knife for <HighlightText text={"learning any language"} />
      </div>
      <div className="w-[55%] text-center font-[750] mt-2">
        {" "}
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more. 
      </div>
      {/* images */}
      <div className="relative w-full flex items-center justify-center">
        {/* second image (center base) */}
        <img src={Compare_with_others} className="z-10" />

        {/* first image beneath */}
        <img src={Know_your_progress} className="absolute  left-44 z-0" />

        {/* third image above */}
        <img src={Plan_your_lessons} className="absolute  right-32 z-20" />
      </div>

    {/* button */}

    <div className="font-bold">
        <CTAButton active={true} children={"Learn More"} />
    </div>

    </div>
  );
};
