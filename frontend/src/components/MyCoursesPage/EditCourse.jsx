///all the imports here
//importing dependencies here
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//importing icons here
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { FaPen, FaPlay, FaCaretDown } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
//importing chakra ui stuff here
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export const EditCourse = () => {
  ///all the states here
  const [title, setTitle] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialDescription, setInitialDescription] = useState("");

  const [price, setPrice] = useState(0);
  const [initialPrice, setInitialPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [initialCategory, setInitialCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [initialTags, setInitialTags] = useState([]);
  const [tag, setTag] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [initialRequirements, setInitialRequirements] = useState([]);
  const [requirement, setRequirement] = useState("");

  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");
  const [expandMenu, setExpandMenu] = useState(null);

  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");

  const [stage, setStage] = useState(0);
  const [isLectureDialogOpen, setIsLectureDialogOpen] = useState(false);

  const [firstButton, setFirstButton] = useState(false);

  ///all the dependencies here
  const { courseId } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  ///all the useEffects here
  //useEffect to fetch course whenever the course id changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/courses/get-course-by-id/${courseId}`,
        );
        console.log(res);
        setTitle(res?.data?.course?.title);
        setInitialTitle(res?.data?.course?.title);
        setDescription(res?.data?.course?.description);
        setInitialDescription(res?.data?.course?.description);
        setPrice(res?.data?.course?.price);
        setInitialPrice(res?.data?.course?.price);
        setCategory(res?.data?.course?.category?.name);
        setInitialCategory(res?.data?.course?.category?.name);
        setTags(res?.data?.course?.tags);
        setInitialTags(res?.data?.course?.tags);
        setRequirements(res?.data?.course?.requirements);
        setInitialRequirements(res?.data?.course?.requirements);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  //useEffect to check whether to unlock the first button
  useEffect(() => {
    if (title != initialTitle) {
    }
  }, [title, description, price, category, tags, requirements]);

  ///all the function here
  const addTag = () => {
    if (!tag.trim()) return;
    setTags([...tags, tag]);
    setTag("");
  };

  const addRequirement = () => {
    if (!requirement.trim()) return;
    setRequirements([...requirements, requirement]);
    setRequirement("");
  };

  const addSection = () => {
    if (!section.trim()) return;
    setSections([...sections, section]);
    setSection("");
  };

  const removeSection = (idx) => {
    setSections((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div>
      {stage === 0 ? (
        <form>
          <div className="flex flex-col gap-3">
            <div>
              <label>Course Title</label>
              <input
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>Description</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select</option>
                <option value="web-development">Web Dev</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
              </select>
            </div>

            <div>
              {tags.map((t, i) => (
                <div key={i}>{t}</div>
              ))}
              <input value={tag} onChange={(e) => setTag(e.target.value)} />
              <button type="button" onClick={addTag}>
                Add Tag
              </button>
            </div>

            <div>
              {requirements.map((r, i) => (
                <div key={i}>{r}</div>
              ))}
              <input
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
              />
              <button type="button" onClick={addRequirement}>
                Add Requirement
              </button>
            </div>

            <button type="button" onClick={() => setStage(1)}>
              Next
            </button>
          </div>
        </form>
      ) : (
        <form className="flex flex-col gap-3">
          <div>
            <label>Section Name</label>
            <input
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
            <button type="button" onClick={addSection}>
              Add Section <IoMdAddCircleOutline />
            </button>
          </div>

          {sections.map((sec, idx) => (
            <div key={idx}>
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => setExpandMenu(expandMenu === idx ? null : idx)}
              >
                <div className="flex items-center gap-2">
                  <IoIosMenu /> {sec}
                </div>
                <div className="flex items-center gap-2">
                  <button type="button">
                    <FaPen />
                  </button>
                  <button type="button" onClick={() => removeSection(idx)}>
                    <RiDeleteBin5Line />
                  </button>
                  <PiLineVerticalThin />
                  {expandMenu === idx ? <FaCaretDown /> : <FaPlay />}
                </div>
              </div>

              {expandMenu === idx && (
                <div>
                  <Dialog.Root
                    open={isLectureDialogOpen}
                    onOpenChange={(e) => setIsLectureDialogOpen(e.open)}
                  >
                    <Dialog.Trigger asChild>
                      <Button onClick={() => setIsLectureDialogOpen(true)}>
                        <IoMdAdd /> Add Lecture
                      </Button>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>Add Lecture</Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body>
                            <input
                              placeholder="Lecture Title"
                              value={lectureTitle}
                              onChange={(e) => setLectureTitle(e.target.value)}
                            />
                            <input
                              placeholder="Lecture Description"
                              value={lectureDescription}
                              onChange={(e) =>
                                setLectureDescription(e.target.value)
                              }
                            />
                          </Dialog.Body>
                          <Dialog.Footer>
                            <Button>Save</Button>
                          </Dialog.Footer>
                          <Dialog.CloseTrigger asChild>
                            <CloseButton />
                          </Dialog.CloseTrigger>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </div>
              )}
            </div>
          ))}

          <button type="button">Save Changes</button>
        </form>
      )}
    </div>
  );
};
