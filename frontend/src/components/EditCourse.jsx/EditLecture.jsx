//importing dependencies here
import { Dialog } from "@chakra-ui/react";

export const AddLecture = ({ addingLecture, setAddingLecture }) => {
  return (
    <Dialog.Root
      open={addingLecture}
      onOpenChange={(e) => setAddingLecture(e.open)}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
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
          <Dialog.Body>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label>Lecture Title</label>
                <input type="text" placeholder="Enter lecture title" />
              </div>

              <div>
                <label>Lecture Description</label>
                <input type="text" placeholder="Enter lecture description" />
              </div>

              <div>
                <label>Lecture Video</label>
                <input type="file" />
              </div>
            </div>
          </Dialog.Body>
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
