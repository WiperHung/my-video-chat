import React, { useContext } from "react";
import {
  Button,
  Dialog,
  makeStyles,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const classes = useStyles();
  const handleClose = () => {};
  //   console.log(call, callAccepted);
  return (
    <>
      <Dialog
        className={classes.paper}
        open={!!call?.isReceivingCall && !callAccepted}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        handleClose={handleClose}
        position="static"
      >
        <DialogTitle>{call.name} is calling:</DialogTitle>
        <DialogContent>
          <Button
            align="center"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "320px",
              minHeight: "320px",
            }}
            variant="contained"
            color="primary"
            onClick={answerCall}
          >
            Answer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Notifications;
