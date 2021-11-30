import React, { useEffect, useState } from "react";
import auth from './../components/auth';
// import changeDirection from './../../../backend/game';
import socket from "../socket";

export const SuccessLogin = (props) => {
    const [board, setBoard] = useState(null);
    const [players, setPlayers] = useState({})
    const [gameOver, setGameOver] = useState(false); 
    const [diableStart, setDisableStart] = useState(false);
    const [nickname, setNickname] = useState("")
    const [direction, setDirection] = useState(null)
    // const [disableButton, setDisableButton] = useState(false); 

    //stops screen from moving up and down when up/down keys pressed
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    socket.on("playerNickname",(nname)=>
    {
        console.log("setNICKNAME", nname)
        setNickname(nname);
    });

    const [selectedColor, setColor] = useState(null);
    // const [disableButton, setDisableButton] = useState(false); 
    
    let snakeColors = ["darkblue", "purple", "darkgreen", "red", "gray", "white", "yellow", "orange"];
    
    const startGame = () => {
        setDisableStart(true);
        setGameOver(false);
        console.log("NICKNAME", nickname);
        socket.emit("initPlayer", nickname);
        // socket.emit("setNickname",nickname);
        socket.on("initializedPlayer", (board) => {
            setBoard(board);
        });
    };
    
    socket.on("updatedStateBoard", (board) => { 
        setBoard(board);
    });

    socket.on("updatePlayers", (players) => { 
        setPlayers(players);
        // for (const [key, value] of Object.entries(players)) {
        //     console.log(`${key}: ${value}`);
        // }
        // setColor(snakeColors[Math.floor(Math.random() * snakeColors.length)]);
        // console.log(Object.keys(players)[0]);
        
    });

    socket.on("GameOver", () => {
        setGameOver(true);
    });
    
    const keyHandler = (event) => {
        // changing the state to the name of the key
      // which is pressed
    //   setKey(event.keyCode);
    //   if (event.keyCode === 37){
    //     // socket.emit("moveSnake", "left");
    //     setDirection("left");
    //   } else if (event.keyCode === 38) {
    //     // socket.emit("moveSnake", "up");
    //     setDirection("up");
    //   } else if (event.keyCode === 39){
    //     // socket.emit("moveSnake", "right");
    //     setDirection("right");
    //   } else if (event.keyCode === 40){
    //     // socket.emit("moveSnake", "down");
    //     setDirection("down");
    //   }

        switch(event.keyCode){
            case 37:
                setDirection("left");
                break;
            case 38:
                setDirection("up");
                break;
            case 39:
                setDirection("right");
                break;
            case 40:
                setDirection("down");
                break;
        }
    };

    const move = () => {
        socket.emit("moveSnake", direction);
    }

    useEffect(() => {
        const interval = setInterval(() => {
          move();
        }, 150);
        return () => clearInterval(interval);
      }, [direction]);

    let snakeSquare = {
        // backgroundColor: "darkblue",
        // color: "white",
        margin: 0,
        padding: 0,
        minWidth: '20px',
        minHeight: '20px',
        maxWidth: '20px',
        maxHeight:'20px',
    };

    let appleSquare = {
        // backgroundColor: "red",
        overflow: "hidden",
        color: "red",
        margin: 0,
        padding: 0,
        minWidth: '20px',
        minHeight: '20px',
        maxWidth: '20px',
        maxHeight:'20px',
    }

    let emptySqure = {
        // backgroundColor: "lightgreen",
        color: "#ACDF81",
        margin: 0,
        padding: 0,
        minWidth: '20px',
        minHeight: '20px',
        maxWidth: '20px',
        maxHeight:'20px',
    }
    let emptySqureDark = {
        color: "#52AF4B",
        backgroundColor: "#ACDF81",
        margin: 0,
        padding: 0,
        width: '20px',
        height:'20px',
    }

    let leaderBoard = {
        backgroundColor:'#bcdce8',
        width: '12em',
        height:'10em',
        marginBottom: '5%',
        marginLeft: '1%',
        border: "2px solid black",
        padding: '1%',
    }

    let container = {
        height: "50em",
        margin: "auto",
        width: "100%",
        textAlign:"center",
    }

    let gameOverText = {
        fontSize: "30px",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
    }

        
    return(
        <section style={{backgroundColor:"lightgrey"}}>
        <section className='container' style={container}>
            <section onKeyDown={(e) => keyHandler(e)} tabIndex="0" style={{paddingTop: '6%', outline: "none"}}>
            <div style={{paddingBottom: '1.5%'}}>
                <h1 style={{fontSize:"1.5em"}}> {"Hunter.io Free For All"} </h1>
                {/* <div> {"Press Start Game and control your snake using arrow keys"} </div> */}
                {gameOver ? 
                    <div>
                        <p style={gameOverText}>GAME OVER</p>
                        <button style={{backgroundColor: "darkblue", color: "white", border: "none", padding: "10px 10px"}} onClick={startGame}>RESTART</button>
                    </div>
                    :  <div> {"Press Start Game and control your snake using arrow keys"} </div>
                }
           </div>
           <div style={{ display: "flex", alignItems: "center"}}>
           <div style={{padding: '10px', justifyContent: "center", paddingLeft:"30%"}}>
                <div>
                { board !== null ? 
                    <table style={{ 
                        border: "2px solid black",
                        width: '400px',
                        backgroundColor: "#ACDF81",
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
                                            ? <td style={appleSquare}>{'🍎'}</td> /* apple */
                                            : <td style={{backgroundColor: `${snakeColors[board[i][j] % 8]}`, color: `${snakeColors[board[i][j] % 8]}`,
                                            margin: 0,
                                            padding: 0,
                                            minWidth: '20px',
                                            minHeight: '20px',
                                            maxWidth: '20px',
                                            maxHeight:'20px'}}>{board[i][j]}</td> /* snake */
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
                    <div style={{
                        border: "2px solid black",
                    height: '400px',
                    width: '400px',
                    backgroundColor: "#ACDF81",
                    borderCollapse: "collapse",}}></div>
                }
                </div>
        
                <button style={{backgroundColor: "darkblue", color: "white", border: "none", padding: "10px 18px", margin: "10px"}} onClick={diableStart ? undefined : startGame}>START GAME</button>
           </div>
            
            <section style={leaderBoard}>
                <div style={{fontWeight:"bold"}}>LEADER BOARD</div>
                <table>
                {(players != undefined) &&
                    Object.entries(players)
                    .map(([key, value]) => 
                    <tr style={{textAlign:"center"}}>
                        {Number(key)+1}) Snake <text style={(value[1].id % 8 < 5) ? {color: "white", backgroundColor: `${snakeColors[value[1].id % 8]}`} : {color: "black", backgroundColor: `${snakeColors[value[1].id % 8]}`}}>{`${value[1].nickname}`}</text> has {`${value[2]}`} points {`\n`}
                    </tr>
                )}
                </table>
            </section>
            </div>
        </section>
        </section>
        </section>
    );
    
}
//style={(j % 2 && i % 2) ? emptySqure: emptySqureDark}