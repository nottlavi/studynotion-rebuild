import { useState } from "react";
import axios from "axios";
//react icons
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
import { FaPlay, FaCaretDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";

//chakra ui stuff
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export const AddCourse = () => {
  //allstates here
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

  //section for lecture video managment
  const [lectureVideo, setLectureVideo] = useState(null);

  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");

  //this state is for managing the current view / stage of the website
  const [stage, setStage] = useState(0);

  //stage for the visibility of expand menu of each section
  const [expandMenu, setExpandMenu] = useState(false);

  //state to manage the add lecture dialog modal
  const [isLectureDialogOpen, setIsLectureDialogOpen] = useState(false);

  //state to manage all the lectures array according to their indeces
  const [megaLectureStorage, setMegaLectureStorage] = useState([]);

  //stage to manage the edit or not section display
  const [editSection, setEditSection] = useState(false);

  //stage to let react know which section is being edited right now
  const [underEditId, setUnderEditId] = useState("");

  //stage to store the temporary edited new name
  const [tempName, setTempName] = useState("");

  const [isEditDialogOpen, setIsEditDialogOpen] = useState();

  //state to manage the lecture which is being edited rn
  const [tempLecture, setTempLecture] = useState({});
  const [tempLectureTitle, setTempLectureTitle] = useState("");
  const [tempLectureDescription, setTempLectureDescription] = useState("");
  const [tempLectureVideo, setTempLectureVideo] = useState("");

  //managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //allfunctions starts here

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

  //function to delete a particular lecture
  const deleteLecture = async (ele) => {
    setMegaLectureStorage(megaLectureStorage.filter((value) => value !== ele));
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

  //function to check if a lecture can be added and when clicked save create a lecture array with the same index of the section on which save button was clicked
  const lectureReqChecker = (idx) => {
    if (!lectureDescription || !lectureTitle || !lectureVideo) return;
    else {
      //i have checked it, i can fetch the index using the idx in input parameters
      setMegaLectureStorage((prev) => [
        ...prev,
        {
          sectionIdx: idx,
          lectureDescription: lectureDescription,
          lectureTitle: lectureTitle,
          lectureVideo: lectureVideo,
        },
      ]);
      //doing this because on clicing save i want all the details to be cleared because once you click save, you are done with this particular lecture
      setLectureDescription("");
      setLectureTitle("");
      setLectureVideo("");
      setIsLectureDialogOpen(false);
    }
  };

  const handleSectionEdit = () => {
    setSections((prev) =>
      prev.map((sec, idx) => (idx === underEditId ? tempName : sec))
    );

    setEditSection(false);
    setTempName("");
    setUnderEditId("");
  };

  const editLectureHelper = (idx) => {
    setTempLecture(megaLectureStorage[idx]);
  };

  const updateLecture = (idx) => {
    {
      megaLectureStorage[idx].lectureTitle = tempLectureTitle;
      megaLectureStorage[idx].lectureDescription = tempLectureDescription;
    }
  };

  //function to create the course using backend
  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/courses/create-course`,
        {
          title,
          tags,
          category,
          description,
          price,
          thumbnail,
          benifits,
          requirements,
          sections,
        },
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
            {editSection ? (
              <input
                value={tempName}
                onChange={(e) => {
                  setTempName(e.target.value);
                }}
                placeholder={sections[underEditId]}
              />
            ) : (
              <input
                id="sectionName"
                type="text"
                value={section}
                onChange={(e) => {
                  setSection(e.target.value);
                }}
              />
            )}
            {/* button to add section OR when you click on edit state to show cancel and edit button*/}
            <div>
              {editSection ? (
                <div className="flex gap-2">
                  <button
                    className="flex gap-2 items-center"
                    type="button"
                    onClick={handleSectionEdit}
                  >
                    Edit Section Name
                    <FaPencilAlt />
                  </button>
                  <button
                    className="underline text-gray-500 text-sm"
                    type="button"
                    onClick={() => {
                      setEditSection(!editSection);
                      setTempName("");
                    }}
                  >
                    Cancel Edit
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center gap-1"
                  type="button"
                  onClick={addSection}
                >
                  Create Section
                  <IoMdAddCircleOutline className="text-yellow-300" />
                </button>
              )}
            </div>
            {/* all the sections will be rendered here */}
            <div>
              {sections.map((ele, idx) => {
                return (
                  // the individual section
                  <div className="flex flex-col" key={idx}>
                    {/* the primary ui which is seen w/o any buttons clicked */}
                    <div
                      className="flex gap-2 justify-between cursor-pointer "
                      onClick={() => {
                        setExpandMenu(expandMenu === idx ? null : idx);
                      }}
                    >
                      {/* closing menu and section name */}
                      <div className="flex gap-1 items-center">
                        <IoIosMenu />
                        <div>{ele}</div>
                      </div>
                      {/* action buttons */}
                      <div className="flex gap-2 items-center">
                        <button
                          type="button"
                          onClick={() => {
                            setUnderEditId(idx);
                            setEditSection(!editSection);
                          }}
                        >
                          <FaPen className="text-sm" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            removeSection(ele);
                          }}
                        >
                          <RiDeleteBin5Line />
                        </button>
                        <PiLineVerticalThin />
                        {expandMenu === idx ? (
                          <FaCaretDown className="text-xl" />
                        ) : (
                          <FaPlay className="text-xs" />
                        )}
                      </div>
                    </div>
                    {/* lecture ground // this section's visiblity will depend on the click on the above div*/}
                    {expandMenu === idx ? (
                      <div className="flex gap-1 items-center flex-col">
                        <div className="flex flex-col gap-4">
                          {megaLectureStorage
                            .filter((lecture) => lecture.sectionIdx === idx)
                            .map((ele, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between"
                                >
                                  {/* div for lecture title and that weird icon */}
                                  <div>{ele.lectureTitle}</div>
                                  {/* div for action buttons */}
                                  <div className="flex">
                                    {/* the whole clickable modal which will open when clicked on edit lecture button */}
                                    <Dialog.Root>
                                      <Dialog.Trigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => editLectureHelper(idx)}
                                        >
                                          <FaPencilAlt />
                                        </Button>
                                      </Dialog.Trigger>
                                      <Portal>
                                        <Dialog.Backdrop />
                                        <Dialog.Positioner>
                                          <Dialog.Content>
                                            <Dialog.Header>
                                              <Dialog.Title>
                                                Editing Lecture
                                              </Dialog.Title>
                                            </Dialog.Header>
                                            <Dialog.Body>
                                              <form>
                                                {/* div for lecture video */}
                                                <div>
                                                  <label>
                                                    Lecture Video{" "}
                                                    <span className="text-red-700">
                                                      *
                                                    </span>
                                                  </label>
                                                  {tempLecture?.lectureVideo && (
                                                    <video
                                                      src={URL.createObjectURL(
                                                        tempLecture.lectureVideo
                                                      )}
                                                      controls
                                                    />
                                                  )}
                                                </div>
                                                {/* div for lecture title */}
                                                <div>
                                                  <label>
                                                    Lecture Title{" "}
                                                    <span className="text-red-700">
                                                      *
                                                    </span>
                                                  </label>
                                                  <input
                                                    placeholder={
                                                      tempLecture?.lectureTitle
                                                    }
                                                    value={tempLectureTitle}
                                                    onChange={(e) => {
                                                      setTempLectureTitle(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                </div>
                                                {/* div for lecture description */}
                                                <div>
                                                  <label>
                                                    Lecture Description{" "}
                                                    <span className="text-red-700">
                                                      *
                                                    </span>
                                                  </label>
                                                  <input
                                                    placeholder={
                                                      tempLecture?.lectureDescription
                                                    }
                                                    value={
                                                      tempLectureDescription
                                                    }
                                                    onChange={(e) => {
                                                      setTempLectureDescription(
                                                        e.target.value
                                                      );
                                                    }}
                                                  />
                                                </div>
                                              </form>
                                            </Dialog.Body>
                                            <Dialog.Footer>
                                              <Dialog.ActionTrigger asChild>
                                                <Button variant="outline">
                                                  Cancel
                                                </Button>
                                              </Dialog.ActionTrigger>
                                              <Button
                                                onClick={() =>
                                                  updateLecture(idx)
                                                }
                                              >
                                                Save
                                              </Button>
                                            </Dialog.Footer>
                                            <Dialog.CloseTrigger asChild>
                                              <CloseButton size="sm" />
                                            </Dialog.CloseTrigger>
                                          </Dialog.Content>
                                        </Dialog.Positioner>
                                      </Portal>
                                    </Dialog.Root>
                                    <button
                                      onClick={() => {
                                        deleteLecture(ele);
                                      }}
                                    >
                                      <RiDeleteBin5Line />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <Dialog.Root
                          open={isLectureDialogOpen}
                          onOpenChange={(e) => setIsLectureDialogOpen(e.open)}
                        >
                          <Dialog.Trigger
                            asChild
                            onClick={() => setIsLectureDialogOpen(true)}
                          >
                            <Button variant="outline" size="sm">
                              <IoMdAdd className="text-yellow-400" /> Add
                              Lecture
                            </Button>
                          </Dialog.Trigger>
                          <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                              <Dialog.Content>
                                <Dialog.Header>
                                  <Dialog.Title>Adding Lecture</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                  <form>
                                    {/* div for lecture video */}
                                    <div>
                                      <label htmlFor="lectureVideo">
                                        Lecture Video
                                      </label>
                                      {lectureVideo ? (
                                        <div>
                                          <video
                                            src={URL.createObjectURL(
                                              lectureVideo
                                            )}
                                            controls
                                          />
                                          <button
                                            onClick={() => {
                                              setLectureVideo(null);
                                            }}
                                          >
                                            clear
                                          </button>
                                        </div>
                                      ) : (
                                        <input
                                          type="file"
                                          accept="video/*"
                                          id="lectureVideo"
                                          onChange={(e) => {
                                            setLectureVideo(e.target.files[0]);
                                          }}
                                        />
                                      )}
                                    </div>
                                    {/* div for lecture title */}
                                    <div>
                                      <label htmlFor="lectureTitle">
                                        Lecture Title
                                      </label>
                                      <input
                                        id="lectureTitle"
                                        value={lectureTitle}
                                        onChange={(e) => {
                                          setLectureTitle(e.target.value);
                                        }}
                                      />
                                    </div>
                                    {/* div for lecture description */}
                                    <div>
                                      <label htmlFor="lectureDescription">
                                        Lecture Description
                                      </label>
                                      <input
                                        id="lectureDescription"
                                        value={lectureDescription}
                                        onChange={(e) => {
                                          setLectureDescription(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </form>
                                </Dialog.Body>
                                <Dialog.Footer>
                                  <Button
                                    onClick={() => {
                                      lectureReqChecker(idx);
                                    }}
                                  >
                                    Save
                                  </Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                  <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                              </Dialog.Content>
                            </Dialog.Positioner>
                          </Portal>
                        </Dialog.Root>
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
