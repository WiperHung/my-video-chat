import React, { useContext } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";

import { SocketContext } from "../Context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  //   console.log(call, callAccepted);
  return (
    <>
      <Dialog
        open={!!call?.isReceivingCall && !callAccepted}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
