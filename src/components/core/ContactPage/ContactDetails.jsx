import React from "react";
import { BiWorld } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const contactDetails = [
  {
    icon: HiChatBubbleLeftRight,
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: BiWorld,
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: IoCall,
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

export const ContactDetails = () => {
  return (
    <div>
      {contactDetails.map((ele, idx) => {
        return (
          // one section
          <div key={idx}>
            {/* div to contain logo and heading */}
            <div className="flex">
              <ele.icon />
              <p>{ele.heading}</p>
            </div>
            {ele.description}
            {ele.details}
          </div>
        );
      })}
    </div>
  );
};
