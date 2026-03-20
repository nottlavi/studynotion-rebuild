import { Dialog } from "@chakra-ui/react";

export const DeleteModal = ({
  deleteModalOpen,
  setDeleteModalOpen,
  courseDeleted,
}) => {
  const deleteCourse = () => {
    console.log("deleting course now: ", courseDeleted);
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
            <Dialog.CloseTrigger asChild>
              <button onClick={() => setDeleteModalOpen(false)}>Close</button>
            </Dialog.CloseTrigger>
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
