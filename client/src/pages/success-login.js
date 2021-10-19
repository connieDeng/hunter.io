import React, { useState, useRef, useEffect } from "react";
import {
    CANVAS_SIZE,
    SNAKE_START,
    APPLE_START,
    SCALE,
    SPEED,
    DIRECTIONS,
  } from "./../helper_function/constants";
import auth from './../components/auth';
import { useInterval } from "./../helper_function/useInterval";
import { findNextStep } from "./snake-movement";
import socket from "../socket";

export const SuccessLogin = (props) => {
    const canvasRef = useRef();
    const [snake, setSnake] = useState(null);
    const [apple, setApple] = useState(null);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    var currentPlayer = undefined;
    //useInterval(() => gameLoop(), speed);
    
    socket.on("UpdateReceived", (otherplayer) =>{
        console.log("Game update received")
        setSnake(otherplayer.start);
        //setApple(otherapple);
        setDir(otherplayer.direction);
        setSpeed(otherplayer.speed);
        setGameStarted(true);
    })

    const ShowUsers = () => {
        console.log("return worked")
        socket.emit("DisplayClients");
        socket.on("returnUsers", (listUserSocketID) =>{
            for(let user in listUserSocketID){
                console.log(listUserSocketID[user])
            }      
        });
    };

    const startGame = () => { 
        socket.emit("checkPlayer",(socket.id)); //Check Player, if its the first player, initialize the board
        socket.on("playerCreated", (player) => {
            currentPlayer = player
            setSnake(player.start);
            setApple(apple);
            setDir(player.direction);
            setSpeed(player.speed);
            setGameStarted(true);
            socket.emit("gameUpdated", (player));
        }); 
    };

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
      };


    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if(gameStarted === true){
            context.fillStyle = "pink";
            snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
            //context.fillStyle = "lightblue";
            //context.fillRect(apple[0], apple[1], 1, 1);
        }   
    }, [snake, apple, gameStarted]);

    return (
        <div>
            <div>You made it; maybe snake game should be here</div> 
            <button
                onClick={() => {
                auth.logout(() => {
                    props.history.push("/");
                });
                }}
            >
                Logout
            </button>
            <button onClick={() => {ShowUsers()}}>Show Clients</button>
            <div role="button" tabIndex="0">
                <canvas
                    style={{ border: "1px solid black" }}
                    ref={canvasRef}
                    width={`${CANVAS_SIZE[0]}px`}
                    height={`${CANVAS_SIZE[1]}px`}
                />
                {gameOver && <div>GAME OVER!</div>}
                <button onClick={startGame}>Start Game</button>
            </div>
        </div>
    ); 
}