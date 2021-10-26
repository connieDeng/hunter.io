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

    const moveSnake = () => {
        socket.emit("moveSnake");
    };
    
    return(
        <div className='container'>
            <div> {"honestly please why"} </div>
            
            <div> 
            { board !== null ? 
                <div>
                    {board.map((row, i) => (
                        <div key={i}>
                        {row.map((col, j) => (
                            <span key={j}>{col}</span>
                        ))}
                        </div>
                    ))} 
                </div> :
                <div> NO BOARD </div>
            }
            </div>
            
            <button onClick={}>CHANGE DIR</button>
            <button onClick={moveSnake}>MOVE</button>
            <button onClick={startGame}>Start Game</button>
        </div>
    );
    
}