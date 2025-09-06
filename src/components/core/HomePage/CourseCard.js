import React from "react";
import { ImTree } from "react-icons/im";
import { HiUsers } from "react-icons/hi";


export const CourseCard = ({ cardData, card, setCard }) => {
  return (
    <div
      onClick={() => {
        setCard(cardData);
      }}
      className={`flex flex-col w-96  pt-4 gap-y-4  ${
        card === cardData ? "bg-white text-black shadow-[10px_10px] shadow-yellow-100" : "bg-blue-900 text-white"
      }`}
    >
      <p className=" font-bold text-[20px] px-5">{cardData?.heading}</p>

      <p className="text-pure-greys-600 px-5 mb-12 w-[90%q]">{cardData?.description}</p>

      <div className="border-t-2 border-gray-500 border-dashed w-full"></div>

      <div className="flex justify-between text-blue-700 px-5 mb-4">
        <div className="flex items-center gap-2">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>
        <div className="flex items-center gap-2">
          <ImTree />
          <p>{cardData?.lessionNumber} Lessons</p>
        </div>
      </div>
    </div>
  );
};
