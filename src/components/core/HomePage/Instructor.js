import React from "react";
import { HighlightText } from "./HighlightText";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
import InstructorImage from "../../../assets/Images/Instructor.png";

export const Instructor = () => {
  return (
    <div className="text-white flex my-20 flex-col justify-center">
      {/* hero */}
      <div className="flex justify-center gap-20 items-center">
        {/* left image */}
        <img
          src={InstructorImage}
          className="w-[40%] shadow-[-20px_-10px] shadow-white"
        />
        {/* right section */}
        <div className="w-[40%] flex flex-col gap-10 ">
          <div className="text-4xl w-[40%]">
            {" "}
            Become an <HighlightText text={"instructor"} />{" "}
          </div>
          <div className="text-pure-greys-200 w-[90%] font-bold">
            {" "}
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>
          <div className="flex items-start">
            <Button active={true} linkto={"/signup"}>
              <div className="flex items-center gap-4 font-bold">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </Button>
          </div>
        </div>
      </div>
      {/* review subsection */}
      <div className="flex justify-center mt-12">
        <div className="text-4xl font-bold">Reviews from other learners
</div>
      </div>
    </div>
  );
};
