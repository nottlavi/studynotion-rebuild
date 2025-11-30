import { useState } from "react";
import axios from "axios";
//react icons
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
import { FaPlay } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export const AddCourse = () => {
  //managing states here
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  // this is just for the single tag which is being typed in, in this moment
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [benifits, setBenifits] = useState("");
  //state for managing a single requirement
  const [requirement, setRequirement] = useState("");
  //this is the whole array which will be sent to backend
  const [requirements, setRequirements] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [section, setSection] = useState("");
  //this is for all the section which will be created
  const [sections, setSections] = useState([]);

  //this state is for managing the current view / stage of the website
  const [stage, setStage] = useState(0);
  //stage for the visibility of expand menu of each section
  const [expandMenu, setExpandMenu] = useState(false);

  //managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //function to update the tags array
  const addTag = async () => {
    if (tag.trim() === "") return;
    setTags([...tags, tag]);
    setTag("");
  };

  //function to add a requirement to the array
  const addRequirement = async () => {
    if (requirement.trim() === "") return;
    setRequirements([...requirements, requirement]);
    setRequirement("");
  };

  //function to add a section
  const addSection = async (e) => {
    e.preventDefault();
    if (section.trim() === "") return;
    setSections([...sections, section]);
    setSection("");
  };

  //function to delete a particular section
  const removeSection = async (ele) => {
    setSections(sections.filter((value) => value !== ele));
  };

  //function to handle stage / ui display
  const stageHandler = (e) => {
    e.preventDefault();
    if (
      stage === 0 &&
      tags &&
      title &&
      category &&
      description &&
      price &&
      benifits &&
      requirements &&
      thumbnail
    ) {
      setStage(1);
    }
  };

  //function to create the course using backend
  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/courses/create-course`,
        { title, tags, category },
        { withCredentials: true }
      );
      if (res) {
        console.log(res);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {stage === 0 ? (
        <form onSubmit={stageHandler}>
          <div className="flex flex-col gap-3">
            {/* section for the title */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">
                Course Title <sup className="text-red-600">*</sup>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            {/* section for description */}
            <div className="flex flex-col gap-1">
              <label htmlFor="description">Course Short Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            {/* section for price */}
            <div className="flex flex-col gap-1">
              <label htmlFor="price">Enter Course Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            {/* section for category selection*/}
            <div className="flex flex-col gap-1">
              <label htmlFor="category"> Course Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                id="category"
              >
                <option value="">Choose Category</option>
                <option value="web-development">Web Development</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
            </div>
            {/* section for tags */}
            <div className="flex flex-col gap-1">
              {tags.map((ele, idx) => {
                return <div key={idx}>{ele}</div>;
              })}
              <label htmlFor="tags">
                tag(s) <sup className="text-red-600">*</sup>
              </label>
              <input
                id="title"
                type="text"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />
              <button onClick={addTag} type="button">
                add tag!
              </button>
            </div>
            {/* section for thumbnail */}
            <div className="flex flex-col gap-1">
              <label>Course Thumbnail</label>
              {thumbnail ? (
                <div>
                  <img src={URL.createObjectURL(thumbnail)} />
                  <button
                    onClick={() => {
                      setThumbnail(null);
                    }}
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setThumbnail(e.target.files[0]);
                  }}
                />
              )}
            </div>
            {/* div for benifits of the course */}
            <div className="flex flex-col gap-1">
              <label htmlFor="benifits">Benifits of the Course</label>
              <input
                type="text"
                id="benifits"
                value={benifits}
                onChange={(e) => {
                  setBenifits(e.target.value);
                }}
              />
            </div>
            {/* requirements / instructions div */}
            <div className="flex flex-col gap-1">
              {requirements.map((ele, idx) => (
                <div key={idx}>{ele}</div>
              ))}
              <label htmlFor="requirements">Requirements/Instructions</label>
              <input
                type="text"
                id="requirements"
                value={requirement}
                onChange={(e) => {
                  setRequirement(e.target.value);
                }}
              />
              <button type="button" onClick={addRequirement}>
                add!
              </button>
            </div>
            <button type="submit">next</button>
          </div>
        </form>
      ) : stage === 1 ? (
        <form className="flex flex-col gap-3">
          Course Builder
          {/* div for section name */}
          <div className="flex flex-col gap-1">
            {/* label and input field for user to enter the name */}
            <label htmlFor="sectioName">Section Name</label>
            <input
              id="sectionName"
              type="text"
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
              }}
            />
            {/* button to add section */}
            <button
              className="flex items-center gap-1"
              type="button"
              onClick={addSection}
            >
              Create Section
              <IoMdAddCircleOutline className="text-yellow-300" />
            </button>
            {/* all the sections will be rendered here */}
            <div>
              hey im printing all the section created by the user
              {sections.map((ele, idx) => {
                return (
                  // the individual section
                  <div className="flex flex-col">
                    {/* the primary ui which is seen w/o any buttons clicked */}
                    <div
                      key={idx}
                      className="flex gap-2 justify-between cursor-pointer"
                      onClick={() => {
                        setExpandMenu(!expandMenu);
                      }}
                    >
                      {/* closing menu and section name */}
                      <div className="flex gap-1 items-center">
                        <IoIosMenu />
                        <div>{ele}</div>
                      </div>
                      {/* action buttons */}
                      <div className="flex gap-2 items-center">
                        <FaPen className="text-sm" />
                        <button
                          type="button"
                          onClick={() => {
                            removeSection(ele);
                          }}
                        >
                          <RiDeleteBin5Line />
                        </button>
                        <PiLineVerticalThin />
                        <FaPlay className="text-xs" />
                      </div>
                    </div>
                    {/* lecture ground // this section's visiblity will depend on the click on the above div*/}
                    {expandMenu ? (
                      <div className="flex gap-1 items-center">
                        <IoMdAdd className="text-yellow-400" /> Add Lecture
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      ) : (
        <div>stage 3</div>
      )}
    </div>
  );
};
