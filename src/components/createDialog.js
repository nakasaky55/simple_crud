import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CreateDialog(props) {
  const { open, handleClose, addData } = props;
  const [nameError, setNameError] = React.useState(null);
  const [ageError, setAgeError] = React.useState(null);
  const [positionError, setPositionError] = React.useState(null);

  const [formName, setFormName] = React.useState("");
  const [formAge, setFormAge] = React.useState("");
  const [formPosition, setFormPosition] = React.useState("");
  const [formJob, setFormJob] = React.useState("");
  const [formNote, setFormNote] = React.useState("");

  const getFormFields = () => {
    const updatedData = {
      name: formName,
      age: formAge,
      position: formPosition,
      job: formJob,
      Note: formNote,
    };
    return updatedData;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            error={nameError ? true : false}
            helperText={nameError ? nameError : ""}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            defaultValue={formName}
            variant="outlined"
            required
            onChange={(e) => {
              if (e.target.value === "") {
                setNameError("Please enter a name");
              } else if (e.target.value.length > 11) {
                setNameError("Only allow 10 characters");
              } else {
                setNameError(null);
                setFormName(e.target.value);
              }
            }}
          />
          <TextField
            error={ageError ? true : false}
            helperText={ageError}
            margin="dense"
            id="age"
            label="Age"
            type="number"
            min="18"
            fullWidth
            defaultValue={formAge}
            variant="outlined"
            required
            onChange={(e) => {
              if (e.target.value < 18) {
                setAgeError("Age must bigger than 18");
              } else {
                setAgeError(null);
                setFormAge(e.target.value);
              }
            }}
          />
          <TextField
            error={positionError ? true : false}
            helperText={positionError}
            margin="dense"
            id="position"
            label="Position"
            type="text"
            fullWidth
            defaultValue={formPosition}
            variant="outlined"
            required
            onChange={(e) => {
              if (e.target.value === "") {
                setPositionError("Please enter a position");
              } else {
                setPositionError(null);
                setFormPosition(e.target.value);
              }
            }}
          />
          <TextField
            margin="dense"
            id="job"
            label="Job"
            type="text"
            fullWidth
            defaultValue={formJob}
            variant="outlined"
            rows={2}
            onChange={(e) => setFormJob(e.target.value)}
          />
          <TextField
            margin="dense"
            id="note"
            label="Note"
            type="text"
            fullWidth
            defaultValue={formNote}
            variant="outlined"
            rows={2}
            onChange={(e) => setFormNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={
              formName === "" || formAge === "" || formPosition === ""
                ? true
                : false
            }
            onClick={() => {
              if (addData(getFormFields())) handleClose();
            }}
            color="primary"
          >
            Create
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
