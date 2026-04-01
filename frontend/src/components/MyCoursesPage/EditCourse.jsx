///all the imports here
//importing dependencies here
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//importing icons here
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { FaPen, FaPlay, FaCaretDown } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiLineVerticalThin } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

//importing components here
import { AddSection } from "../../components/EditCourse.jsx/AddSection";
import { DeleteModal } from "../EditCourse.jsx/DeleteModal";
import { DeleteSubSectionModal } from "../EditCourse.jsx/DeleteSubSectionModal";
import { AddLecture } from "../EditCourse.jsx/AddLecture";
import { EditLecture } from "../EditCourse.jsx/EditLecture";

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
  const [initialSections, setInitialSections] = useState([]);
  const [expandMenu, setExpandMenu] = useState(null);

  const [stage, setStage] = useState(0);

  const [firstButton, setFirstButton] = useState(false);

  const [addingSection, setAddingSection] = useState(false);

  //states to manage the section which is being deleted
  const [deleteSection, setDeleteSection] = useState(null);
  const [deleteSectionModal, setDeleteSectionModal] = useState(false);
  //states to manage subsection delete flow
  const [deleteSubSection, setDeleteSubSection] = useState(null);
  const [deleteParentSectionId, setDeleteParentSectionId] = useState(null);
  const [deleteSubSectionModal, setDeleteSubSectionModal] = useState(false);

  //state to manage the blocking of section delete button
  const [blockSecDelete, setBlockSecDelete] = useState(false);
  //state to tell which section is being edited
  const [editSection, setEditSection] = useState({});
  // state to store the initial section name of the the section which will be edited
  const [initialSectionName, setInitialSectionName] = useState("");
  const [sectionName, setSectionName] = useState("");
  //state to block the section edit tick mark if name hasnt been changes
  const [blockTick, setBlockTick] = useState(true);
  //state to tell whether a lecture is being added
  const [addingLecture, setAddingLecture] = useState(false);
  //state to send to add lecture modal for section id
  const [lecSecId, setLecSecId] = useState("");
  //state to tell which lecture is being edited
  const [editLecture, setEditLecture] = useState("");

  ///all the dependencies here
  const { courseId } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  ///all the useEffects here
  //useEffect to fetch course whenever the course id changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/courses/get-course-by-id/${courseId}`,
        );
        setTitle(res?.data?.course?.title);
        setInitialTitle(res?.data?.course?.title);
        const desc = (res?.data?.course?.description || "").trim();
        setDescription(desc);
        setInitialDescription(desc);
        setPrice(Number(res?.data?.course?.price));
        setInitialPrice(Number(res?.data?.course?.price));
        setCategory(res?.data?.course?.category?.name);
        setInitialCategory(res?.data?.course?.category?.name);
        setTags(res?.data?.course?.tags);
        setInitialTags(res?.data?.course?.tags);
        setRequirements(res?.data?.course?.requirements);
        setInitialRequirements(res?.data?.course?.requirements);

        setSections(res?.data?.course?.sections);
        setInitialSections(res?.data?.course?.sections);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  //useEffect to check whether to unlock the first button
  useEffect(() => {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      category === "" ||
      tags.length == 0 ||
      requirements.length == 0
    ) {
      setFirstButton(false);
      return;
    }
    if (
      title.trim() !== initialTitle ||
      description.trim() !== initialDescription.trim() ||
      Number(price) !== Number(initialPrice) ||
      category !== initialCategory ||
      JSON.stringify(tags) !== JSON.stringify(initialTags) ||
      JSON.stringify(requirements) !== JSON.stringify(initialRequirements)
    ) {
      setFirstButton(true);
    } else {
      setFirstButton(false);
    }
  }, [
    title,
    description,
    price,
    category,
    tags,
    requirements,
    initialTitle,
    initialDescription,
    initialCategory,
    initialPrice,
    initialTags,
    initialRequirements,
  ]);

  //useEffect to enable/disable section delete button if only one section is left
  useEffect(() => {
    if (sections?.length === 1) {
      setBlockSecDelete(true);
    } else {
      setBlockSecDelete(false);
    }
  }, [sections]);

  //useEffect to enable/disable the tick mark for section edit name
  useEffect(() => {
    if (sectionName.trim() !== initialSectionName) {
      setBlockTick(false);
    } else {
      setBlockTick(true);
    }
  }, [sectionName, initialSectionName]);

  ///all the functions here
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

  //function to save stage 1 in the backend
  const saveStage1 = async (e) => {
    e.preventDefault();

    const payload = {};
    if (title.trim() !== initialTitle) {
      payload.title = title;
    }
    if (description.trim() !== initialDescription) {
      payload.description = description;
    }
    if (price != initialPrice) {
      payload.price = price;
    }
    if (category !== initialCategory) {
      payload.category = category;
    }
    if (JSON.stringify(tags) !== JSON.stringify(initialTags)) {
      payload.tags = tags;
    }
    if (JSON.stringify(requirements) !== JSON.stringify(initialRequirements)) {
      payload.requirements = requirements;
    }

    payload.courseId = courseId;

    try {
      const res = await axios.put(
        `${BASE_URL}/courses/update`,
        { payload },
        {
          withCredentials: true,
        },
      );
      console.log(res);

      const updated = res?.data?.course;

      setTitle(updated.title);
      setDescription(updated.description);
      setPrice(Number(updated.price));
      setCategory(updated.category.name);
      setTags(updated.tags);
      setRequirements(updated.requirements);

      setInitialTitle(updated.title);
      setInitialDescription(updated.description);
      setInitialPrice(Number(updated.price));
      setInitialCategory(updated.category.name);
      setInitialTags(updated.tags);
      setInitialRequirements(updated.requirements);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSectionEdit = async (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(sectionId, sectionName);
    try {
      const res = await axios.put(
        `${BASE_URL}/section/edit`,
        { sectionId, newTitle: sectionName },
        { withCredentials: true },
      );
      if (res) {
        console.log(res);
        //need to set the name of section on client side
        setSections((prev) =>
          prev.map((section) =>
            section._id == sectionId
              ? { ...section, title: res?.data?.section?.title }
              : section,
          ),
        );
        //need to disable input section name
        setEditSection("");
        setInitialSectionName("");
        setSectionName("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isSubSectionDeleteBlocked = (subsections = []) => {
    return subsections.length <= 1;
  };

  return (
    <div>
      {stage === 0 ? (
        <form>
          <div className="flex flex-col gap-3">
            <div>
              <label>Course Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
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
                value={price ?? ""}
                onChange={(e) => setPrice(Number(e.target.value))}
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
            <button disabled={!firstButton} onClick={saveStage1}>
              Save
            </button>
          </div>
        </form>
      ) : (
        <form className="flex flex-col gap-3">
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setAddingSection(true);
              }}
            >
              Add Section <IoMdAddCircleOutline />
            </button>
          </div>

          {addingSection && (
            <AddSection
              addingSection={addingSection}
              setAddingSection={setAddingSection}
              setSections={setSections}
            />
          )}

          {sections.map((sec, idx) => (
            <div key={sec._id || idx}>
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => setExpandMenu(expandMenu === idx ? null : idx)}
              >
                {/* div to render either the input field or just plain section title */}
                {editSection?._id === sec._id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      value={sectionName}
                      onChange={(e) => setSectionName(e.target.value)}
                      onBlur={() => {
                        setEditSection(null);
                        setSectionName("");
                        setInitialSectionName("");
                      }}
                    />
                    <button
                      disabled={blockTick}
                      onClick={(e) => handleSectionEdit(e, sec?._id)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <IoIosMenu /> {sec.title}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditSection(sec);
                    }}
                  >
                    <FaPen
                      onClick={() => {
                        setSectionName(sec?.title);
                        setInitialSectionName(sec?.title);
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteSection(sec);
                      setDeleteSectionModal(true);
                    }}
                    disabled={blockSecDelete}
                  >
                    <RiDeleteBin5Line />
                  </button>
                  <PiLineVerticalThin />
                  {expandMenu === idx ? <FaCaretDown /> : <FaPlay />}
                </div>
              </div>

              {/* when a certain menu is expanded */}
              {expandMenu === idx && (
                <div>
                  {sec?.subsections?.map((subsection) => (
                    <div
                      key={subsection?._id}
                      className="flex items-center gap-2"
                    >
                      {/* for title rendering */}
                      <div>{subsection?.title}</div>
                      {/* for action buttons */}
                      <div>
                        <button onClick={(e) => e.preventDefault()}>
                          <GoPencil
                            onClick={() => {
                              setEditLecture(subsection._id);
                            }}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDeleteSubSection(subsection);
                            setDeleteParentSectionId(sec?._id);
                            setDeleteSubSectionModal(true);
                          }}
                          disabled={
                            isSubSectionDeleteBlocked(sec?.subsections || []) ||
                            !subsection?._id
                          }
                        >
                          <RiDeleteBin5Line />
                        </button>
                      </div>
                      {console.log(editLecture)}
                      {console.log(subsection._id)}
                      {editLecture == subsection._id && (
                        <EditLecture
                          lectId={editLecture}
                          onClose={() => setEditLecture(null)}
                        />
                      )}
                    </div>
                  ))}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAddingLecture(true);
                      setLecSecId(sec?._id);
                    }}
                  >
                    Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          {deleteSectionModal && (
            <DeleteModal
              deleteSection={deleteSection}
              setDeleteSectionModal={setDeleteSectionModal}
              deleteSectionModal={deleteSectionModal}
              setSections={setSections}
              setDeleteSection={setDeleteSection}
            />
          )}

          {deleteSubSectionModal && (
            <DeleteSubSectionModal
              deleteSubSection={deleteSubSection}
              setDeleteSubSection={setDeleteSubSection}
              deleteSubSectionModal={deleteSubSectionModal}
              setDeleteSubSectionModal={setDeleteSubSectionModal}
              deleteParentSectionId={deleteParentSectionId}
              setDeleteParentSectionId={setDeleteParentSectionId}
              setSections={setSections}
            />
          )}

          {addingLecture && (
            <AddLecture
              addingLecture={addingLecture}
              setAddingLecture={setAddingLecture}
              lecSecId={lecSecId}
              setSections={setSections}
            />
          )}

          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/my-courses");
            }}
          >
            Finish
          </button>
        </form>
      )}
    </div>
  );
};
