//importing dependencies here
import { Dialog } from "@chakra-ui/react";
import api from "../../utils/api";
import { toaster } from "../ui/toaster";
import { useState } from "react";

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

  const closeModal = () => {
    setDeleteSubSectionModal(false);
    setDeleteSubSection(null);
    setDeleteParentSectionId(null);
  };

  const [, setDeleting] = useState(false);

  const deleteHandler = async (e) => {
    e.preventDefault();

    if (!deleteSubSection?._id || !deleteParentSectionId) return;

    try {
      setDeleting(true);
      const res = await api.delete(`/subsection/delete`, {
        data: { subSectionId: deleteSubSection._id },
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
        toaster.add({
          title: "Deleted",
          description: "Lecture removed.",
          type: "success",
          closable: true,
        });
      }
    } catch (err) {
      toaster.add({
        title: "Delete failed",
        description: err?.message || "Could not delete lecture",
        type: "error",
        closable: true,
      });
    } finally {
      setDeleting(false);
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
