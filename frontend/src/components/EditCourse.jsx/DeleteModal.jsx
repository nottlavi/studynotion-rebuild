///all the imports here
//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import api from "../../utils/api";
import { toaster } from "../ui/toaster";
import { useState } from "react";

export const DeleteModal = ({
  deleteSection,
  setDeleteSection,
  deleteSectionModal,
  setDeleteSectionModal,
  setSections,
}) => {
  ///managing all the dependencies here

  const [deleting, setDeleting] = useState(false);

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      setDeleting(true);
      const res = await api.delete(`/section/delete`, {
        data: { sectionId: deleteSection?._id },
      });
      if (res) {
        setSections((prev) =>
          prev.filter((section) => section._id !== deleteSection._id),
        );
        setDeleteSection(null);
        setDeleteSectionModal(false);
        toaster.add({
          title: "Deleted",
          description: "Section deleted.",
          type: "success",
          closable: true,
        });
      }
    } catch (err) {
      toaster.add({
        title: "Delete failed",
        description: err?.message || "Could not delete section",
        type: "error",
        closable: true,
      });
    } finally {
      setDeleting(false);
    }
  };
  // Removed extra closing brace

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
            <button onClick={deleteHandler} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
