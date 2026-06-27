import { Dialog } from "@chakra-ui/react";
import api from "../../utils/api";
import { toaster } from "../ui/toaster";
import { useState } from "react";

export const DeleteModal = ({
  deleteModalOpen,
  setDeleteModalOpen,
  courseDeleted,
  setOwnedCourses,
}) => {
  const [deleting, setDeleting] = useState(false);
  const deleteCourse = async () => {
    if (deleting) return;
    try {
      setDeleting(true);
      const res = await api.delete(`/courses/delete-course`, {
        data: { courseId: courseDeleted?._id },
      });
      if (res) {
        setOwnedCourses((prev) =>
          prev.filter((course) => course._id !== courseDeleted?._id),
        );
        setDeleteModalOpen(false);
        toaster.add({
          title: "Deleted",
          description: "Course deleted.",
          type: "success",
          closable: true,
        });
      }
    } catch (err) {
      toaster.add({
        title: "Delete failed",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Could not delete course",
        type: "error",
        closable: true,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <Dialog.Root
        open={deleteModalOpen}
        onOpenChange={(e) => setDeleteModalOpen(e.open)}
      >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="modal-surface">
            <Dialog.CloseTrigger asChild></Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Delete Course</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body className="modal-body-stack">
              <div>
                <p>delete course tilted "{courseDeleted?.title}"?</p>
              </div>
            </Dialog.Body>
            <Dialog.Footer className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button onClick={deleteCourse} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
};
