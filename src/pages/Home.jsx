import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import { CodeBlocks } from "../components/core/HomePage/CodeBlocks";
import { Footer } from "../components/common/Footer";
import { TimelineSection } from "../components/core/HomePage/TimelineSection";
import { LearningLanguageSection } from "../components/core/HomePage/LearningLanguageSection";
import { FaA } from "react-icons/fa6";
import { Instructor } from "../components/core/HomePage/Instructor";
import { ExploreMore } from "../components/core/HomePage/ExploreMore";
import {Navbar} from "../components/common/Navbar"

export const Home = () => {
  return (
    <div >
      <Navbar />
      {/* section 1 */}
      <div className="mt-16 w-screen flex flex-col justify-center items-center">
        {/* Become a Instructor Button */}
        <Link to={"/signup"}>
          {/* the outer container of the button */}
          <div className="bg-richblue-800 p-1 rounded-full  text-white h-12 px-8 ">
            {/* the content container of the button */}
            <div className="flex items-center justify-center h-full gap-4">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        {/* heading and subheading */}
        <div className="flex justify-center flex-col items-center gap-5 mt-5">
          <div className="text-white  text-4xl font-semibold">
            Empower Your Future With
            <HighlightText text={"Coding Skills"} />
          </div>
          <div className=" text-richblack-300 text-center w-[55%]">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
        </div>
        {/* buttons of section 1 */}
        <div className="flex gap-6 mt-10">
          <CTAButton active={true} linkto={"/signup"}>
            {" "}
            Learn More{" "}
          </CTAButton>
          <CTAButton
            active={false}
            linkto={"/login"}
            children={"Book a Demo"}
          />
        </div>
        {/* video of section 1 */}
        <div className="w-[80%] h-96 mt-16 shadow-[10px_-5px_50px_-5px] shadow-blue-200 mb-96">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px] shadow-white"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* codeblock container */}
        <div className="flex flex-col gap-32 mb-24">
          {/*code block 1 of section 1 */}
          <div className="flex items-center">
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div>
                  Unlock Your <HighlightText text={"coding potential"} /> with
                  out online courses
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                active: true,
                btnText: "Try it Yourself",
                linkto: "/signup",
              }}
              ctabtn2={{
                active: false,
                btnText: "Learn More",
                linkto: "/login",
              }}
              codeColor={"text-yellow-25"}
              codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
              backgroundGradient={<div className="codeblock1 absolute"></div>}
            />
          </div>
          {/* code block 2 of section 1 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div>
                  Unlock Your <HighlightText text={"coding potential"} /> with
                  out online courses
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                active: true,
                btnText: "Try it yourself",
                linkto: "/signup",
              }}
              ctabtn2={{
                active: false,
                btnText: "Learn More",
                linkto: "/login",
              }}
              codeColor={"text-yellow-25"}
              codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
              backgroundGradient={<div className="codeblock1 absolute"></div>}
            />
          </div>
        </div>

        <ExploreMore />

      </div>

      {/* section 2 */}

  <div className=" text-richblack-700 bg-pure-greys-5 pb-20">
        {/* button sub section */}
        <div className=" h-[500px] flex gap-7 items-center justify-center bg-no-repeat w-full bg-cover">
          <CTAButton active={true}>
            <div className="flex items-center gap-4 font-bold">
              <p>Explore Full Catalog</p>
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={false}>
            <div className="flex items-center gap-4 font-bold">
              <p>Learn More</p>
            </div>
          </CTAButton>
        </div>
        {/* job in demand section */}
        <div className="flex items-center justify-around my-10">
          {/* left section */}
          <div className="text-4xl w-[35%]">
            Get the skills you need for a{" "}
            <HighlightText text={"job that is in demand."} />
          </div>
          {/* right section */}
          <div className="w-[32%] flex flex-col gap-10">
            <p>
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <div className="items-start flex font-bold">
              <CTAButton
                active={true}
                children={"Learn More"}
                linkto={"/signup"}
              />
            </div>
          </div>
        </div>
        {/* timeline section */}
        <TimelineSection />

        <LearningLanguageSection />
      </div>

      {/* section 3 */}

      <Instructor />

      <Footer />
    </div>
  );
};
