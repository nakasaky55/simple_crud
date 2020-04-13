import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const {
    open,
    handleClose,
    updateData,
    data: { name, age, position, Note, job, id },
  } = props;
  const [nameError, setNameError] = React.useState(null);
  const [ageError, setAgeError] = React.useState(null);
  const [positionError, setPositionError] = React.useState(null);

  const [formName, setFormName] = React.useState(name);
  const [formAge, setFormAge] = React.useState(age);
  const [formPosition, setFormPosition] = React.useState(position);
  const [formNote, setFormNote] = React.useState(Note);

  const getFormFields = () => {
    const updatedData = {
      name: formName,
      age: formAge,
      position: formPosition,
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
            defaultValue={name}
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
            defaultValue={age}
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
            defaultValue={position}
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
            id="note"
            label="Note"
            type="text"
            fullWidth
            defaultValue={Note}
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
            onClick={() => updateData(id, getFormFields())}
            color="primary"
          >
            Update
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
