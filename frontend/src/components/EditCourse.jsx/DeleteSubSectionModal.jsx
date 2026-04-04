//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import axios from "axios";

export const DeleteSubSectionModal = ({
  deleteSubSection,
  setDeleteSubSection,
  deleteSubSectionModal,
  setDeleteSubSectionModal,
  deleteParentSectionId,
  setDeleteParentSectionId,
  setSections,
}) => {
  ///all dependencies here
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const closeModal = () => {
    setDeleteSubSectionModal(false);
    setDeleteSubSection(null);
    setDeleteParentSectionId(null);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    if (!deleteSubSection?._id || !deleteParentSectionId) return;

    try {
      const res = await axios.delete(`${BASE_URL}/subsection/delete`, {
        data: { subSectionId: deleteSubSection._id },
        withCredentials: true,
      });

      if (res) {
        setSections((prev) =>
          prev.map((section) =>
            section._id !== deleteParentSectionId
              ? section
              : {
                  ...section,
                  subsections: (section.subsections || []).filter(
                    (subsection) => subsection._id !== deleteSubSection._id,
                  ),
                },
          ),
        );
        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog.Root
      open={deleteSubSectionModal}
      onOpenChange={(e) => {
        if (!e.open) {
          closeModal();
          return;
        }
        setDeleteSubSectionModal(true);
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content className="modal-surface">
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Delete Lecture?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body className="modal-body-stack">
            <p>
              Are you sure, you want to delete lecture titled{" "}
              {deleteSubSection?.title}?
            </p>
          </Dialog.Body>
          <Dialog.Footer className="modal-footer">
            <button onClick={deleteHandler}>Delete</button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
