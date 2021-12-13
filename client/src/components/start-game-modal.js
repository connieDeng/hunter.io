import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import socket from "../socket";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vw',
  height: '100vh',
  bgcolor: 'rgba(22, 28, 34, 0.95)',
  p: 4
};

const typography_style = {
  color:'white',
}

const box_content = {
  color:'white',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center'
}

export default function BasicModal() {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [nickname, setNickname] = useState("");
  const modalRef = useRef(null)
  
  const game_descriptions = [
    "Press Start Game and control your snake using arrow keys.",
    "Eat apples to grow longer!",
    "Don't run into other players!",
    "KILL OTHERS!",
  ]
  const submitToFFA = (nickname) =>{ 
    setOpen(false)
    socket.emit('saveNickname', nickname);
  }

  return (
    <div>
      <Modal 
        ref={modalRef}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <section style={box_content}>
              <Typography style={{fontSize:'10em', fontFamily:'Courier New', color:'purple'}} id="modal-modal-title" variant="h6" component="h2">
              Hunter<span style={{color:'yellow'}}>.io</span>
              </Typography>
              <Typography id="modal-modal-description">
              {game_descriptions[0]}
              </Typography>
              <div><input placeholder="Nickname" onChange={(e) => setNickname(e.target.value)}></input></div>
              <button onClick={() => submitToFFA(nickname)}>Play FFA</button>
            </section>
        </Box>
      </Modal>
    </div>
  );
}