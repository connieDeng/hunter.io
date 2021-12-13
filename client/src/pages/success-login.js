import React, { useEffect, useState, useRef} from "react";
import auth from './../components/auth';
// import changeDirection from './../../../backend/game';
import socket from "../socket";
import StartModal from './../components/start-game-modal';

export const SuccessLogin = (props) => {
    const [board, setBoard] = useState(null);
    const [players, setPlayers] = useState({})
    const [gameOver, setGameOver] = useState(true); 
    const [diableStart, setDisableStart] = useState(false);
    const [nickname, setNickname] = useState("")
    const [direction, setDirection] = useState(null)
    // const [disableButton, setDisableButton] = useState(false); 
    const sectionRef = useRef(null)
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
    
    let snakeColors = ["red", "yellow", "orange", "green", "blue", "purple", "pink", "brown", "gray", "darkgreen", 
        "darkblue", "BlueViolet", "Chartreuse", "DarkGoldenRod", "DarkSalmon", "DarkSlateGrey", "IndianRed", "Khaki", "MediumSeaGreen", "Peru",
        "RebeccaPurple", "Sienna", "Thistle", "YellowGreen", "SeaShell", "RosyBrown", "Orchid", "MidnightBlue", "LightSalmon", "HoneyDew"
    ];
    
    const startGame = () => {
        setDisableStart(true);
        setGameOver(false);
        sectionRef.current.focus()
        console.log("NICKNAME", nickname);
        socket.emit("initPlayer", nickname);
        socket.on("initializedPlayer", (board) => {
            setBoard(board);
        });
    };
    
    socket.on("updatedStateBoard", (board) => { 
        setBoard(board);
    });

    socket.on("updatePlayers", (players) => { 
        setPlayers(players);
    });

    socket.on("GameOver", () => {
        setTimeout(function() {
            setGameOver(true);
        }, 1000)
        
    });
    
    const keyHandler = (event) => {
        if (event.repeat === false){
            switch(event.keyCode){
                case 37:
                    setDirection("left");
                    socket.emit("moveSnake", direction);
                    break;
                case 38:
                    setDirection("up");
                    socket.emit("moveSnake", direction);
                    break;
                case 39:
                    setDirection("right");
                    socket.emit("moveSnake", direction);
                    break;
                case 40:
                    setDirection("down");
                    socket.emit("moveSnake", direction);
                    break;
            }
        }
        
    };

    const move = () => {
        socket.emit("moveSnake", direction);
    }

    useEffect(() => {
        const interval = setInterval(() => {
          move();
        }, 100);
        return () => clearInterval(interval);
      }, [direction]);


      let snakeSquare = {
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
        position:"absolute",
        top:'5em',
        right: '6em',
        textAlign:"center",
        backgroundColor:'rgb(150, 194, 112, .90)',
        width: '15em',
        height:'10em',
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
        margin: 0,
    }

    return(
        <section>
        <StartModal></StartModal>
        <h1 style={{fontFamily:'Courier New', fontSize:'2em', margin:".5em", textAlign:'center'}}> 
            <span style={{color:'purple'}}>Hunter</span>
            <span style={{color:'yellow'}}>.io </span>
            <span style={{color:'white'}}>Free For All</span>
        </h1>
        <section className='container' style={container}>
            <section ref={sectionRef} onClick={()=> console.log('clicked')}onKeyDown={(e) => keyHandler(e)} tabIndex="0" style={{outline: "none"}} autoFocus>
            <div>
                <div style={{
                    position: 'absolute',
                    left:'45%', 
                    top:"40%"
                }}>
                    {gameOver ? 
                        <div>
                            <p style={gameOverText}>Start Game</p>
                            <button 
                                style={{backgroundColor: "darkblue", color: "white", border: "none", padding:'1em'}} 
                                onClick={startGame}>
                                    PLAY
                            </button>
                        </div>
                        :  <div></div>
                    }
                </div>
                
           </div>
           <div style={{ display: "flex", alignItems: "center"}}>
           <div>
                <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex:-1,
                }}>
                { board !== null ? 
                    <table style={{ 
                        border: "2px solid black",
                        width: '400px',
                        backgroundColor: "#ACDF81",
                        borderCollapse: "collapse",
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
                                </td>
                            ))}
                            </tr>
                            
                        ))} 
                    </table> :
                    <div style={{
                    border: "2px solid black",
                    height: '805px',
                    width: '1760px',
                    backgroundColor: "#ACDF81",
                    borderCollapse: "collapse"}}></div>
                }
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
            </div>
        </section>
        </section>
        </section>
    );
    
}
//style={(j % 2 && i % 2) ? emptySqure: emptySqureDark}