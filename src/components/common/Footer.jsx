import React from "react";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo-Full-Light.png";

export const Footer = () => {
  return (
    <footer className="bg-richblack-800  text-pure-greys-500">
      <div className=" px-6 py-12 grid grid-cols-6 w-11/12  mx-auto">
        {/* company */}
        <div className="flex flex-col gap-y-5">
          <h3 className="font-bold text-white">Company</h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>About</li>
            <li>Careers</li>
            <li>Affiliates</li>
          </ul>
          <div className="flex space-x-2">
            <FaFacebook />
            <FaGoogle />
            <FaTwitter />
            <FaYoutube />
          </div>
          <img src={Logo} className="mt-20 w-44 h-9"></img>
        </div>
        {/* resources */}
        <div className="flex flex-col gap-y-5">
          <h3 className="font-bold text-white">Resources</h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>Articles</li>
            <li>Blog</li>
            <li>Chart Sheet</li>
            <li>Code challenges</li>
            <li>Docs</li>
            <li>Projects</li>
            <li>Videos</li>
            <li>Workspace</li>
          </ul>
        </div>
        {/* plans */}
        <div className="flex flex-col gap-y-5">
          <h3 className="font-bold text-white">Plans</h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>Paid memberships</li>
            <li>For Students</li>
            <li>Business solutions</li>
          </ul>
        </div>
        {/* <div className="w-[0.5px] h-7 bg-pure-greys-600"></div> */}
        {/* subjects */}
        <div className="flex flex-col gap-y-5 border-l-[1px] border-pure-greys-700 pl-7">
          <h3 className="font-bold text-white">Subjects</h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>AI</li>
            <li> Cloud Computing</li>
            <li>Code Foundations </li>
            <li>Computer Science</li>
            <li>Cybersecurity</li>
            <li>Data Analytics</li>
            <li>Data Science</li>
            <li>Data Visualization</li>
            <li>Developer Toosl</li>
            <li>DevOps</li>
            <li>Game Development</li>
            <li>IT</li>
            <li>Machine Learning</li>
            <li>Math</li>
            <li>Wb Design</li>
            <li>Web Development</li>
          </ul>
        </div>

        <div className="flex flex-col gap-y-5">
          <h3 className="font-bold text-white">Languages</h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>Bash</li>
            <li>C</li>
            <li>C++ </li>
            <li>C#</li>
            <li>Go</li>
            <li>HTML & CSS</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>Kotlin</li>
            <li>PHP</li>
            <li>Python</li>
            <li>R</li>
            <li>Ruby</li>
            <li>SQl</li>
            <li>Swift</li>
          </ul>
        </div>

        <div className="flex flex-col gap-y-5">
          <h3 className="font-bold text-white">Career building</h3>
          <ul className="flex flex-col gap-3 text-[15px]">
            <li>Career Path</li>
            <li> Career Services</li>
            <li>Interview Prep </li>
            <li>Professional certificates</li>
            <li>-</li>
            <li>Full Catalog</li>
            <li>Beta Content</li>
          </ul>
        </div>

        <div>
          <h3></h3>
          <ul>
            <li></li>
            <li> </li>
            <li> </li>
          </ul>
        </div>
      </div>
      <div className="bg-pure-greys-500 w-[85%] h-[0.5px] mx-auto"></div>
      <div className="flex justify-between px-5 mt-10 pb-10 mx-24 text-sm">
        <div className="flex gap-x-5">
          <p className="border-r-[1px] pr-4">Privacy Policy</p>
          <p className="border-r-[1px] pr-4">Cookie Policy</p>
          <p className="">Terms</p>
        </div>
        <p>Made with 🩷 Target Techonologies @ 2023 Studynotion</p>
      </div>
    </footer>
  );
};
