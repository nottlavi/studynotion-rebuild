//importing redux stuff here
import { useEffect, useState } from "react";

//importing react icons here
import { CiMenuKebab } from "react-icons/ci";

//imporiting headless ui components here
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

//importing dependencies here
import { useSelector } from "react-redux";
import axios from "axios";

export const EnrolledCourses = () => {
  //all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  ///all the redux stuff here
  const profile = useSelector((state) => state.user.profile);

  ///all the states here
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  ///all the useEffects here
  useEffect(() => {
    if (profile) {
      setEnrolledCourses(profile.enrolledCourses);
    }
  }, [profile]);

  ///all the functions here
  const handleRemove = async () => {
    try {
    } catch (err) {}
  };

  return (
    <div>
      {/* location and enrolled coursesheading */}
      <div className="flex flex-col gap-3">
        <div>Home / Dashboard / Enrolled Courses</div>
        <div>Enrolled Courses</div>
      </div>
      {/* filter buttons div */}
      <div className="flex gap-4">
        <div>All</div>
        <div>Pending</div>
        <div>Completed</div>
      </div>
      {/* table header div */}
      <div className="flex justify-between">
        <p>Course Name</p>
        {/* duration and progress div */}
        <div className="flex gap-3">
          <p>Durations</p>
          <p>Progress</p>
        </div>
      </div>
      {/* table content container/div */}
      {enrolledCourses.map((ele) => {
        const totalDuration = ele?.sections?.reduce((acc, section) => {
          return (
            acc +
            (section.subsections?.reduce(
              (subAcc, sub) => subAcc + (sub.duration || 0),
              0,
            ) || 0)
          );
        }, 0);
        return (
          <div key={ele._id} className="flex justify-between">
            {/* title and thumbnail div */}
            <div className="flex gap-2 items-start">
              <img
                src={ele?.thumbnail}
                width={40}
                height={60}
                className="rounded-md"
              />
              <div className="flex flex-col">
                <p>{ele?.title}</p>
                <p>{ele?.description}</p>
              </div>
            </div>
            {/* duration and progress div */}
            <div className="flex gap-3">
              <p>{totalDuration.toFixed(2)} min</p>
              <p>Progress: xx%</p>
            </div>
            {/* menu button div */}
            <Menu>
              <MenuButton>
                {" "}
                <CiMenuKebab />
              </MenuButton>
              <MenuItems className="flex flex-col gap-1">
                <MenuItem as="button">Mark as completed</MenuItem>
                <MenuItem
                  as="button"
                  onClick={() => {
                    handleRemove;
                  }}
                >
                  Remove
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        );
      })}
    </div>
  );
};
