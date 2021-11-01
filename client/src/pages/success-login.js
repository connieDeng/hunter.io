import React, { useEffect, useState } from "react";
import auth from './../components/auth';
// import changeDirection from './../../../backend/game';
import socket from "../socket";

export const SuccessLogin = (props) => {
    const [board, setBoard] = useState(null);

    const startGame = () => { 
        socket.emit("initPlayer");
        
        socket.on("initializedPlayer", (board) => {
            setBoard(board);
        });

        // socket.emit("moveSnake", socket.id);
    };
    
    socket.on("playerMoved", (board) => { 
        console.log("player moved")
    });

    socket.on("updatedStateBoard", (board) => { 
        setBoard(board);
    });
    socket.on("updateNickname",(nickname)=>{
        
    });
    const moveSnake = () => {
        socket.emit("moveSnake");
    };

    let inputStyle = {
        backgroundColor: "lightblue",
        // color: "red",
        display: "inline-block",
        width: 20,
        border: "1px solid black",
    };
    
    
    return(

        <div className='container'>
            <div> {"honestly please why"} </div>
            
            <div style={{ border: "1px solid black",
            width: `${window.innerWidth / 1.5}px`,
         }}
            > 
            { board !== null ? 
                <div style={{
                    rows: 20,
                    columns: 20,
                    backgroundColor: "gray"
                }}
                >
                    {board.map((row, i) => (
                        <div key={i}>
                        {row.map((col, j) => (
                            <div style={inputStyle}
                            key={j}>{col}</div>
                        ))}
                        </div>
                    ))} 
                </div> :
                <div> NO BOARD </div>
            }
            </div>
            
            {/* <button onClick={}>CHANGE DIR</button> */}
            <button onClick={moveSnake}>MOVE</button>
            <button onClick={startGame}>Start Game</button>
        </div>
    );
    
}