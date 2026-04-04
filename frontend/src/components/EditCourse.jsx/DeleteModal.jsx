///all the imports here
//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import axios from "axios";

export const DeleteModal = ({
  deleteSection,
  setDeleteSection,
  deleteSectionModal,
  setDeleteSectionModal,
  setSections,
}) => {
  ///managing all the dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`${BASE_URL}/section/delete`, {
        data: { sectionId: deleteSection?._id },
        withCredentials: true,
      });

      if (res) {
        console.log(res);
        setSections((prev) =>
          prev.filter((section) => section._id !== deleteSection._id),
        );
        setDeleteSection(null);
        setDeleteSectionModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog.Root
      open={deleteSectionModal}
      onOpenChange={(e) => setDeleteSectionModal(e.open)}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className="modal-surface">
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Delete Section?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className="modal-body-stack">
            <p>
              Are you Sure, You want to delete section titled{" "}
              {deleteSection?.title}?
            </p>
            <p>
              All of the components including all the lectures inside this
              section will be deleted
            </p>
            <p>total no of lectures {deleteSection?.subsections?.length}</p>
          </Dialog.Body>
          <Dialog.Footer className="modal-footer">
            <button onClick={deleteHandler}>Delete</button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
