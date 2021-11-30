import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import socket from "../socket";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [nickname, setNickname] = useState("");

  const submitToFFA = (nickname) =>{ 
    setOpen(false)
    socket.emit('saveNickname', nickname);
}

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Hunter.io
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Press Start Game and control your snake using arrow keys
            </Typography>
            Nickname: <input onChange={(e) => setNickname(e.target.value)}></input>
            <button onClick={() => submitToFFA(nickname)}>Play FFA</button>
        </Box>
      </Modal>
    </div>
  );
}