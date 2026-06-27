//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toaster } from "../ui/toaster";

export const EditLecture = ({ lectId, onClose }) => {
  ///all the dependencies here

  ///all the states here
  //states for input fields
  const [lectureTitle, setLectureTitle] = useState("");
  const [initialLectureTitle, setInitialLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [initiaLectureDescription, setInitialLectureDescription] = useState("");

  //state to toggle the blocking of save button
  const [blocked, setBlocked] = useState(true);
  const [, setLoadingFetch] = useState(false);
  const [saving, setSaving] = useState(false);

  ///all the useEffects here
  //useEffect to fetch lecture data from backend
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        setLoadingFetch(true);
        const res = await api.get(`/subsection/get/${lectId}`);
        if (res) {
          setLectureTitle(res?.data?.subSection?.title);
          setInitialLectureTitle(res?.data?.subSection?.title);
          setLectureDescription(res?.data?.subSection?.description);
          setInitialLectureDescription(res?.data?.subSection?.description);
        }
      } catch (err) {
        toaster.add({
          title: "Load failed",
          description: err?.message || "Could not load lecture",
          type: "error",
          closable: true,
        });
      } finally {
        setLoadingFetch(false);
      }
    };
    fetchLecture();
  }, [lectId]);

  //useEffect to toggle the blocking of save button
  useEffect(() => {
    // no-op for debug in prod

    if (
      (lectureDescription.trim() !== initiaLectureDescription &&
        lectureDescription.trim() !== "") ||
      (lectureTitle.trim() !== initialLectureTitle &&
        lectureTitle.trim() !== "")
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
      setSaving(true);
      const res = await api.put(`/subsection/edit`, {
        newName: lectureTitle,
        newDescription: lectureDescription,
        subSectionId: lectId,
      });
      if (res) {
        setInitialLectureDescription("");
        setInitialLectureTitle("");
        setLectureDescription("");
        setLectureTitle("");
        toaster.add({
          title: "Saved",
          description: "Lecture updated.",
          type: "success",
          closable: true,
        });
        onClose();
      }
    } catch (err) {
      toaster.add({
        title: "Save failed",
        description: err?.message || "Could not update lecture",
        type: "error",
        closable: true,
      });
    } finally {
      setSaving(false);
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
        <Dialog.Content className="modal-surface">
          <Dialog.CloseTrigger onClick={() => {}}>X</Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Edit Lecture</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className="modal-body-stack">
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
          <Dialog.Footer className="modal-footer">
            <button disabled={blocked || saving} onClick={handleSave}>
              {saving ? "Saving..." : "Save"}
            </button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
