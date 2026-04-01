//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export const EditLecture = ({ lectId, onClose }) => {
  ///all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  ///all the states here
  //states for input fields
  const [lectureTitle, setLectureTitle] = useState("");
  const [initialLectureTitle, setInitialLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [initiaLectureDescription, setInitialLectureDescription] = useState("");

  //state to toggle the blocking of save button
  const [blocked, setBlocked] = useState(true);

  ///all the useEffects here
  //useEffect to fetch lecture data from backend
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/subsection/get/${lectId}`);

        if (res) {
          console.log(res);
          setLectureTitle(res?.data?.subSection?.title);
          setInitialLectureTitle(res?.data?.subSection?.title);
          setLectureDescription(res?.data?.subSection?.description);
          setInitialLectureDescription(res?.data?.subSection?.description);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchLecture();
  }, [lectId]);

  //useEffect to toggle the blocking of save button
  useEffect(() => {
    console.log(
      lectureDescription,
      lectureTitle,
      initiaLectureDescription,
      initialLectureTitle,
    );

    if (
      (lectureDescription.trim() != initiaLectureDescription &&
        lectureDescription.trim() != "") ||
      (lectureTitle.trim() != initialLectureTitle && lectureTitle.trim() != "")
    ) {
      setBlocked(false);
    } else {
      setBlocked(true);
    }
  }, [
    lectureTitle,
    initialLectureTitle,
    lectureDescription,
    initiaLectureDescription,
  ]);

  //function to edit the lecture from backend
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/subsection/edit`,
        {
          newName: lectureTitle,
          newDescription: lectureDescription,
          subSectionId: lectId,
        },
        { withCredentials: true },
      );

      if (res) {
        console.log(res);
        setInitialLectureDescription("");
        setInitialLectureTitle("");
        setLectureDescription("");
        setLectureTitle("");
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog.Root
      open={lectId}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger onClick={() => {}}>X</Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Edit Lecture</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label>Lecture Title</label>
                <input
                  type="text"
                  placeholder="Enter lecture title"
                  value={lectureTitle}
                  onChange={(e) => {
                    setLectureTitle(e.target.value);
                  }}
                />
              </div>

              <div>
                <label>Lecture Description</label>
                <input
                  type="text"
                  placeholder="Enter lecture description"
                  value={lectureDescription}
                  onChange={(e) => setLectureDescription(e.target.value)}
                />
              </div>
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <button disabled={blocked} onClick={handleSave}>
              Save?
            </button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
