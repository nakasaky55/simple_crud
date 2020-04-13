import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import FormDialog from "./dialog";
import AlertDialog from "./deleteDialog";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: "10px",
  },
  media: {
    height: 140,
  },
  captionText: {
    display: "flex",
    justifyContent: "space-around",
  },
  noteText: {
    marginTop: "10px",
  },
  textUpper: {
    textTransform: "uppercase",
  },
  displayFlex: {
    display: "flex",
  },
});

const MediaCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { name, age, job, position, Note, id } = props.data;
  const { deleteData, updateData } = props;
  const data = { name, age, job, position, Note, id };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="image"
            className={classes.media}
            image={require("../static/images/gitlab.png")}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <div className={classes.captionText}>
              <Typography variant="caption" display="block" gutterBottom>
                Job: <span className={classes.textUpper}>{job}</span>
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Position: <span className={classes.textUpper}>{position}</span>
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Age: {age}
              </Typography>
            </div>
            <Typography
              className={classes.noteText}
              variant="body1"
              color="textSecondary"
              component="p"
            >
              {Note}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            <Typography
              className={classes.displayFlex}
              variant="button"
              gutterBottom
            >
              <EditIcon fontSize="small" /> Update
            </Typography>
          </Button>
          <Button size="small" color="primary" onClick={handleClickOpenDelete}>
            <Typography
              className={classes.displayFlex}
              variant="button"
              gutterBottom
              color="error"
            >
              <HighlightOffIcon fontSize="small" />
              Delete
            </Typography>
          </Button>
        </CardActions>
      </Card>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={data}
        updateData={updateData}
      />
      <AlertDialog
        open={openDelete}
        handleOpen={handleClickOpenDelete}
        handleClose={handleCloseDelete}
        deleteData={deleteData}
        id={id}
      />
    </>
  );
};

export default MediaCard;
