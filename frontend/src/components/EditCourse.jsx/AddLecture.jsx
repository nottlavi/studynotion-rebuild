//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import { toaster } from "../ui/toaster";

export const AddLecture = ({
  addingLecture,
  setAddingLecture,
  lecSecId,
  setSections,
}) => {
  ///all the dependencies here

  ///all the states here
  //states to manage input form data
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureDescription, setLectureDescription] = useState("");
  const [lectureVideo, setLectureVideo] = useState(null);

  //state to disable/enable the submit button
  const [disableMain, setDisableMain] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  ///all the use Effects here
  //useEffects to disable enable the main button
  useEffect(() => {
    if (!lectureTitle || !lectureDescription || !lectureVideo) {
      setDisableMain(true);
    } else {
      setDisableMain(false);
    }
  }, [lectureTitle, lectureDescription, lectureVideo]);

  const addLecture = async (e) => {
    e.preventDefault();
    let videoResult = {};
    // trying to upload the video first
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", lectureVideo);
      data.append("upload_preset", "hi1wsn1z");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dguufm5le/video/upload",
        { method: "POST", body: data },
      );

      if (!res.ok) {
        toaster.add({
          title: "Upload failed",
          description: "Video upload failed.",
          type: "error",
          closable: true,
        });
        setUploading(false);
        return;
      }

      const result = await res.json();
      videoResult = result;
    } catch (err) {
      toaster.add({
        title: "Upload error",
        description: err?.message || "Upload failed",
        type: "error",
        closable: true,
      });
      setUploading(false);
      return;
    }

    //now creating the section
    try {
      setSubmitting(true);
      const res = await api.post(`/subsection/create-sub-section`, {
        title: lectureTitle,
        description: lectureDescription,
        videoUrl: videoResult?.secure_url,
        section: lecSecId,
        duration: videoResult?.duration,
      });

      setSections((prev) =>
        prev.map((section) =>
          section._id === lecSecId
            ? {
                ...section,
                subsections: [...(section.subsections || []), res.data.data],
              }
            : section,
        ),
      );
      setLectureTitle("");
      setLectureDescription("");
      setLectureVideo(null);
      setAddingLecture(false);
      toaster.add({
        title: "Lecture added",
        description: "Lecture uploaded successfully.",
        type: "success",
        closable: true,
      });
    } catch (err) {
      toaster.add({
        title: "Create failed",
        description: err?.message || "Could not add lecture",
        type: "error",
        closable: true,
      });
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <Dialog.Root
      open={addingLecture}
      onOpenChange={(e) => setAddingLecture(e.open)}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className="modal-surface">
          <Dialog.CloseTrigger
            onClick={() => {
              setAddingLecture(false);
            }}
          >
            X
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Add Lecture</Dialog.Title>
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
                  onChange={(e) => setLectureTitle(e.target.value)}
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

              <div>
                {lectureVideo && (
                  <video src={URL.createObjectURL(lectureVideo)} controls />
                )}
                <label>Lecture Video</label>
                <input
                  type="file"
                  onChange={(e) => setLectureVideo(e.target.files[0])}
                  accept="video/*"
                />
              </div>
            </div>
          </Dialog.Body>
          <Dialog.Footer className="modal-footer">
            <button
              disabled={disableMain || uploading || submitting}
              onClick={addLecture}
            >
              {uploading || submitting ? "Adding..." : "Add Lecture"}
            </button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
