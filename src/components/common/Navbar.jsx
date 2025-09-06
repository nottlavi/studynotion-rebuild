import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";

export const Navbar = ({ active }) => {
  const [sublinks, setSublinks] = useState([]);

  let location = useLocation();

  const checkPath = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        setSublinks(result.data.data);
      } catch (err) {
        console.log("couldnt getch categories from the backend", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      className={`flex h-14 items-center justify-between text-white px-24 border-b-[0.1px] border-pure-greys-600 relative {
    ${active ? "bg-richblack-800" : "bg-transparent"}
    `}
    >
      {/* logo */}
      <Link to={"/"}>
        <img src={logo} className="w-40 h-8" />
      </Link>
      {/* text-links container */}
      <div className="flex gap-6 font-450 text-[16px] items-center">
        {NavbarLinks.map((ele, id) => {
          // for catalog
          if (ele.title === "Catalog") {
            return (
              <div className="group relative" key={id}>
                <div key={id} className="flex items-center gap-1">
                  {ele.title}
                  <IoIosArrowDown />
                </div>
                {/* extended menu */}
                <div className="opacity-0 group-hover:opacity-100 absolute top-10">
                  {/* categories container */}
                  <div className="bg-white min-w-fit  min-h-fit text-richblack-800 ">
                    {sublinks.map((ele, id) => {
                      return <div className="hover:bg-richblack-200">{ele.name}</div>;
                    })}
                  </div>
                  {/* the triangular div */}
                  <div></div>
                </div>
              </div>
            );
          }
          // for home about and contact
          else {
            return (
              // just a complex way of adding link, thought on my own
              // <div>
              //   <Link to={ele.title === "Home" ? "/" : ele.title === "About Us" ? "/aboutus" : "/contactus"}>
              //     {ele.title}
              //   </Link>
              // </div>
              <div
                key={id}
                className={`${
                  checkPath(ele.path) ? "text-yellow-25" : "text-white"
                }`}
              >
                <Link to={ele.path}>{ele.title}</Link>
              </div>
            );
          }
        })}
      </div>
      {/* buttons container */}
      <div className="gap-x-4 flex">
        <Link to={"/login"}>
          <button className="bg-richblack-800 py-2 px-3 font-medium border-pure-greys-600 rounded-lg border-[0.5px] text-pure-greys-100">
            Log In
          </button>
        </Link>
        <Link to={"/signup"}>
          <button className="bg-richblack-800 py-2 px-3 font-medium border-pure-greys-600 rounded-lg border-[0.5px] text-pure-greys-100">
            Sign Up
          </button>
        </Link>
      </div>

      {/* the extended menu for catalog */}
    </div>
  );
};
