import React, { useEffect, useState } from "react";
import auth from './../components/auth';
// import changeDirection from './../../../backend/game';
import socket from "../socket";

export const SuccessLogin = (props) => {
    const [board, setBoard] = useState(null);
    const [players, setPlayers] = useState({})
    const [gameOver, setGameOver] = useState(false); 
    const startGame = () => { 
        if (gameOver == false) {
            socket.emit("initPlayer");
        
            socket.on("initializedPlayer", (board) => {
                setBoard(board);
            }); 
        }
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

    socket.on("GameOver", () => {
        // document.getElementById("gameOver").innerHTML = "Game Over";
        setGameOver(true);
    });
    
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

    let snakeSquare = {
        backgroundColor: "darkblue",
        color: "darkblue",
        margin: 0,
        padding: 0,
        width: '20px',
        height:'20px',
    };

    let appleSquare = {
        backgroundColor: "red",
        color: "red",
        margin: 0,
        padding: 0,
        width: '20px',
        height:'20px',
    }

    let emptySqure = {
        // backgroundColor: "lightgreen",
        color: "lightgreen",
        margin: 0,
        padding: 0,
        width: '20px',
        height:'20px',
    }
    let emptySqureDark = {
        color: "#52AF4B",
        backgroundColor: "#52AF4B",
        margin: 0,
        padding: 0,
        width: '20px',
        height:'20px',
    }

    let leaderBoard = {
        backgroundColor:'green',
        color: "white",
        width: '200px',
        height:'200px',
        textAlign: "center",
        border: "2px solid black",
    }

    let boardContent = {
        textAlign: "center"
    }

    return(
        <section className='container' onKeyDown={(e) => keyHandler(e)} tabIndex="0">
            <div>
                <div> {"Free For All"} </div>
                <div> {"Press Start Game and control your snake using arrow keys"} </div>
           </div>
           <div style={{ display: "flex", alignItems: "center"}}>
           <div style={{padding: 10, justifyContent: "center"}}>
                <div>
                { board !== null ? 
                    <table style={{ 
                        border: "2px solid black",
                        width: '400px',
                        backgroundColor: "lightgreen",
                        borderCollapse: "collapse",
                        // border: "0"
                    }}
                    >
                        {board.map((row, i) => (
                            <tr key={i}>
                            {row.map((col, j) => (
                                // <span>{col}</span>
                                <td>
                                    { col === -1
                                        ? <td style={emptySqure}>{'●'}</td>
                                        : ( col === 'A'
                                            ? <td style={appleSquare}>{'●'}</td> /* apple */
                                            : <td style={snakeSquare}>{'●'}</td> /* snake */
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
                    <div> </div>
                }
                </div>
        
                <button style={{backgroundColor: "darkblue", color: "white", border: "none", padding: "10px 18px", margin: "10px"}} onClick={startGame}>START GAME</button>
                {gameOver ? <p>GAME OVER</p> :  <p></p>}
           </div>
            
            <section style={leaderBoard}>
                <div>LEADER BOARD</div>
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
            </div>
        </section>
    );
    
}
//style={(j % 2 && i % 2) ? emptySqure: emptySqureDark}