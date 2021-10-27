import React, { useEffect, useState } from "react";
import auth from './../components/auth';
// import changeDirection from './../../../backend/game';
import socket from "../socket";

export const SuccessLogin = (props) => {
    const [board, setBoard] = useState(null);
    const [players, setPlayers] = useState({})
    const startGame = () => { 
        socket.emit("initPlayer");
        
        socket.on("initializedPlayer", (board) => {
            setBoard(board);
        }); 
    };
    
    socket.on("playerMoved", (board) => { 
        console.log("player moved")
    });

    socket.on("updatedStateBoard", (board) => { 
        setBoard(board);
    });

    socket.on("updatePlayers", (players) => { 
        setPlayers(players);
        console.log(players)
    });

    const moveSnake = () => {
        socket.emit("moveSnake");
    };
    
    const keyHandler = (event) => {
        // changing the state to the name of the key
      // which is pressed
    //   setKey(event.keyCode);
      if (event.keyCode === 37){
        socket.emit("moveSnake", "left");
      } else if (event.keyCode === 38) {
        socket.emit("moveSnake", "up");
      } else if (event.keyCode === 39){
        socket.emit("moveSnake", "right");
      } else if (event.keyCode === 40){
        socket.emit("moveSnake", "down");
      }
    };
    
    return(
        <section className='container' onKeyDown={(e) => keyHandler(e)} style={{backgroundColor:"lightBlue", position:"absolute"}} tabIndex="0">
            <div> {"honestly please why"} </div>
            
            <div> 
            { board !== null ? 
                <table>
                    {board.map((row, i) => (
                        <tr key={i}>
                        {row.map((col, j) => (
                            // <span>{col}</span>
                            <td>
                                { col === -1
                                    ? <td>{'●'}</td>
                                    : ( col === 'A'
                                        ? <td>{'A'}</td>
                                        : <td>{col}</td>
                                    )
                                }
                                {/* <span>
                                {col === -1
                                    ? <span style={{padding:'5px'}}>{' '}</span>
                                    : <span>{'U'}</span>
                                }
                                </span> */}
                            </td>
                        ))}
                        </tr>
                    ))} 
                </table> :
                <div> NO BOARD </div>
            }
            </div>
      
            {/* <button onClick={}>CHANGE DIR</button> */}
            <button onClick={moveSnake}>MOVE</button>
            <button onClick={startGame}>Start Game</button>
            {/* <input type="text" onKeyPress={(e) => handler(e)} /> */}


            <div>Leader Board</div>
            <table>
            {
                Object.entries(players)
                .map(([key, value]) => 
                    <tr>
                        {`Snake ${value[1].id} has ${value[2]} points \n`}
                    </tr>
                )
            }
            </table>
        </section>
    );
    
}