///all the imports here
//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//importing icons here
import { GoPencil } from "react-icons/go";

export const AddSection = ({
  addingSection,
  setAddingSection,
  setSections,
}) => {
  ///all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { courseId } = useParams();

  ///all the states here
  //state to track section name changes
  const [sectionName, setSectionName] = useState("");
  //state to set final section name when input has lost focus
  const [finalSectionName, setFinalSectionName] = useState("");
  //state to show/hide input for section name
  const [showInput, setShowInput] = useState(true);
  //state to expand lecture adding menu
  const [lectAddMenu, setLectAddMenu] = useState(false);
  //state to block the create section button
  const [block, setBlock] = useState(true);
  //state to block the create lecture button
  const [block1, setBlock1] = useState(true);
  //states to manage sub section details
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDesctiption] = useState("");
  const [lectureVideo, setLectureVideo] = useState();
  //state to manage all the lectures/subsection for this particular section
  const [lectures, setLectures] = useState([]);
  //state to view/expand a lecture after it has been added
  const [expandedLecture, setExpandedLecture] = useState(null);

  ///all the functions here
  const addName = () => {
    setFinalSectionName(sectionName);
    setShowInput(false);
  };
  //function to add a lecture/subsection to frontend temp state
  const addLecture = (e) => {
    e.preventDefault();
    setLectures((prev) => [
      ...prev,
      {
        lectureTitle: lectureTitle,
        lectureDescription: lectureDescription,
        lectureVideo: lectureVideo,
      },
    ]);
    setLectureTitle("");
    setLectureDesctiption("");
    setLectureVideo(null);
  };

  //function to finally create a section
  const createSection = async (e) => {
    let section = "";

    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/section/create/course-id`,
        {
          courseId,
          title: sectionName,
        },
        { withCredentials: true },
      );

      if (res) {
        console.log(res);
        section = res?.data?.section?._id;
      }
    } catch (err) {
      console.error(err);
    }

    //now i will create all the sub sections
    for (let i = 0; i < lectures.length; i++) {
      const lecture = lectures[i];
      let resultSave = {};

      //first of all uploading the lecture video to cloudinary
      try {
        const data = new FormData();
        data.append("file", lecture.lectureVideo);
        data.append("upload_preset", "hi1wsn1z");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dguufm5le/video/upload",
          { method: "POST", body: data },
        );

        if (!res.ok) {
          console.log(res);
        }

        const result = await res.json();
        resultSave = result;

        console.log(result);
      } catch (err) {
        console.error(err);
      }

      //creating the sub section here
      try {
        const res = await axios.post(
          `${BASE_URL}/subsection/create-sub-section`,
          {
            title: lecture.lectureTitle,
            description: lecture.lectureDescription,
            videoUrl: resultSave.secure_url,
            section: section,
            duration: resultSave.duration,
          },
        );

        console.log(res);
      } catch (err) {
        console.error(err);
      }

      if (section) {
        setSections((prev) => [
          ...prev,
          {
            _id: section,
            title: sectionName,
            subsections: lectures.map((lec) => ({
              title: lec.lectureTitle,
              description: lec.lectureDescription,
            })),
          },
        ]);

        setAddingSection(false);
      }
    }
  };

  ///all the useEffects here
  //use effect to check whether section creation button can be unblocked
  useEffect(() => {
    if (sectionName && lectures.length > 0) {
      setBlock(false);
    } else {
      setBlock(true);
    }
  }, [sectionName, lectures]);

  //use effect to check whether add lecture button can be enabled
  useEffect(() => {
    if (lectureTitle && lectureDescription && lectureVideo) {
      setBlock1(false);
    } else {
      setBlock1(true);
    }
  }, [lectureTitle, lectureDescription, lectureVideo]);

  return (
    <div className="edit-course-modal">
      <Dialog.Root
        open={addingSection}
        onOpenChange={(e) => setAddingSection(e.open)}
      >
        <Dialog.Trigger />
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="modal-surface">
            <Dialog.Header>
              <Dialog.Title>Add Section</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="modal-body-stack">
              <div className="flex  gap-2 items-center">
                <label htmlFor="sectionName">Section Name</label>
                {finalSectionName}
                {/* input field for section name */}
                {showInput ? (
                  <input
                    id="sectionName"
                    type="text"
                    placeholder="Enter section name"
                    className="border px-2 py-1 rounded"
                    onBlur={addName}
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                  />
                ) : (
                  <></>
                )}
                {/* action buttons for section */}
                {!showInput && (
                  <GoPencil
                    className="cursor-pointer"
                    onClick={() => {
                      setShowInput(true);
                    }}
                  />
                )}
              </div>
              {/* all the subsection (if any currently) are being rendered here */}
              {lectures.length > 0 && (
                <div className="flex flex-col gap-1">
                  {lectures.map((lecture, idx) => (
                    <div key={idx}>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          setExpandedLecture(
                            expandedLecture === idx ? null : idx,
                          )
                        }
                      >
                        {lecture.lectureTitle}
                      </div>

                      {expandedLecture === idx && (
                        <div>
                          {lecture.lectureTitle}
                          {lecture.lectureDescription}
                          <video
                            src={URL.createObjectURL(lecture.lectureVideo)}
                            controls
                            width="200"
                          />{" "}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {finalSectionName && (
                // div for adding subsections name
                <div className="cursor-pointer">
                  <p onClick={() => setLectAddMenu((prev) => !prev)}>
                    Add Sub Section
                  </p>

                  {/* div to show all the lectures */}

                  {/* div to add lecture */}
                  {lectAddMenu && (
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex flex-col">
                        <label htmlFor="lectureTitle">Lecture Title</label>
                        <input
                          id="lectureTitle"
                          type="text"
                          placeholder="Enter lecture title"
                          className="border px-2 py-1 rounded"
                          value={lectureTitle}
                          onChange={(e) => setLectureTitle(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="lectureDescription">
                          Lecture Description
                        </label>
                        <input
                          id="lectureDescription"
                          type="text"
                          placeholder="Enter lecture description"
                          className="border px-2 py-1 rounded"
                          value={lectureDescription}
                          onChange={(e) =>
                            setLectureDesctiption(e.target.value)
                          }
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="lectureVideo">Lecture Video</label>
                        <input
                          id="lectureVideo"
                          type="file"
                          accept="video/*"
                          className="border px-2 py-1 rounded"
                          onChange={(e) => setLectureVideo(e.target.files[0])}
                        />
                      </div>
                      <button onClick={addLecture} disabled={block1}>
                        Add Lecture
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Dialog.Body>
            <Dialog.Footer className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setAddingSection(false)}
              >
                Cancel
              </button>
              <button onClick={createSection} disabled={block}>
                Create Section
              </button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
};
