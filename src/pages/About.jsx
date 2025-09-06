import React from "react";
import { Navbar } from "../components/common/Navbar";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import img4 from "../assets/Images/FoundingStory.png";
import { StatsComponent } from "../components/core/AboutPage/Stats";
import { LearningGrid } from "../components/core/AboutPage/LearningGrid";
import { ContactFormSection } from "../components/core/AboutPage/ContactFormSection";


export const About = () => {
  return (
    <div>
      <Navbar active={true} />
      {/* all section container */}
      <div className="text-white">
        {/* section 1 */}
        <section>
          <p>
            Driving Innovation in Online Education for a{" "}
            <HighlightText text={"Brighter Future"} />
          </p>
          <p>
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
          {/* section 1 image container */}
          <div className="flex">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
          </div>
        </section>
        {/* section 2 starts */}
        <section className="border-b-[0.5px] border-richblack-500">
          <p>
            We are passionate about revolutionizing the way we learn. Our
            innovative platform combines technology, expertise, and community to
            create an unparalleled educational experience.
          </p>
        </section>
        {/* section 3 start */}
        <section>
          <div className="flex">
            <div>
              <h1>Our Founding Story</h1>
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world. As
                experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div>
              <img
                src={img4}
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>

          <div className="flex">
            <div>
              <h1> Our Vision </h1>
              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div>
              <h1> Our Vision </h1>
              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
          </div>
        </section>

        <StatsComponent />
        <LearningGrid />
        <ContactFormSection />
      </div>
    </div>
  );
};
