import React from "react";
import CTAbutton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export const CodeBlocks = ({
  position = "",
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock = "",
  backgroundGradient,
  codeColor = "text-white",
}) => {
  const lines = codeblock ? codeblock.split("\n") : [];

  return (
    <div className={`flex flex-col ${position} mx-auto w-[85%]  gap-40`}>
      {/* Left / copy section */}
      <div className="flex flex-col gap-3 mt-[-10px]">
        <div className="text-[35px] font-semibold text-richblack-5 leading-snug">
          {heading}
        </div>
        {subheading && (
          <p className="text-richblack-300 text-[17px] w-[90%] font-extrabold">
            {subheading}
          </p>
        )}
        {/* button container */}
        <div className="flex gap-4 flex-wrap mt-8">
          {ctabtn1 && (
            <div className="shadow-[2px_-2px]q  shadow-blue-5">
               
            <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto} >
              <div className="max-w-maxContent  flex items-center gap-3 font-bold ">
                {ctabtn1.btnText} <FaArrowRight />
              </div>
            </CTAbutton>
            </div>
          )}

          {ctabtn2 && (
            <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              <div className="max-w-maxContent  flex items-center gap-3 font-bold">
                {ctabtn2.btnText}
              </div>
            </CTAbutton>
          )}
        </div>
      </div>

      {/* right section */}
      <div className="mainContainer flex gap-5  relative min-h-80 border border-richblack-700 z-10 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.3),#111827,#000)] w-[38%] p-4">
        <div className="text-richblack-400 font-semibold z-10">
          {codeblock.split("\n").map((_, idx) => (
            <p key={idx + 1}> {idx + 1} </p>
          ))}
        </div>
        <div
          className={`w-[700px] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1 z-10`}
        >
          <TypeAnimation
            sequence={[codeblock, 500, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              fontSize: "13px",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};
