import { Dialog } from "@chakra-ui/react";
import axios from "axios";

export const DeleteModal = ({
  deleteModalOpen,
  setDeleteModalOpen,
  courseDeleted,
  setOwnedCourses,
}) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const deleteCourse = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/courses/delete-course`, {
        data: { courseId: courseDeleted?._id },
        withCredentials: true,
      });
      if (res) {
        setOwnedCourses((prev) =>
          prev.filter((course) => course._id != courseDeleted?._id),
        );
        setDeleteModalOpen(false);
      }
    } catch (err) {
      console.log(err.response);
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
          <Dialog.Content>
            <Dialog.CloseTrigger asChild></Dialog.CloseTrigger>
            <Dialog.Header>
              <Dialog.Title>Delete Course</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <div>
                <p>delete course tilted "{courseDeleted?.title}"?</p>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
              <button onClick={deleteCourse}>Delete</button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
};
