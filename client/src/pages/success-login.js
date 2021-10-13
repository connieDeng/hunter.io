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
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    var Player = 0
    
    useInterval(() => gameLoop(), speed);
    

    const ShowUsers = () => {
        console.log("return worked")
        socket.emit("DisplayClients");
        socket.on("returnUsers", (listUserSocketID) =>{
            for(let user in listUserSocketID){
                console.log(listUserSocketID[user])
            }      
        });
    };


    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
      };
    
    const moveSnake = () =>
    {
        let nextmove = findNextStep(dir, snake, apple);
        setDir(DIRECTIONS[nextmove]);
    }

    const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

    const checkCollision = (piece, snk = snake) => {
    if (
        piece[0] * SCALE >= CANVAS_SIZE[0] ||
        piece[0] < 0 ||
        piece[1] * SCALE >= CANVAS_SIZE[1] ||
        piece[1] < 0
    )
        return true;

    for (const segment of snk) {
        if (piece[0] === segment[0] && piece[1] === segment[1]) {
        return true;
        };
    }
    return false;
    };

    const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
        let newApple = createApple();
        while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
        }
        setApple(newApple);
        return true;
    }
    return false;
    };

    const gameLoop = () => {
        socket.emit("playersMove");
        socket.on("playerTurn", (playernum) => {
            Player = playernum;
            console.log(Player);
        });
        console.log("Player: ", Player)
        // if (Player === 1){
            const snakeCopy = JSON.parse(JSON.stringify(snake));
            moveSnake();
            const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
            snakeCopy.unshift(newSnakeHead);
            if (checkCollision(newSnakeHead)) {
                endGame();
            };
            if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
            setSnake(snakeCopy);
            socket.emit("gameUpdated", (snake, apple, gameOver));
        // }

    };

    const startGame = () => {  
            setSnake(SNAKE_START);
            setApple(APPLE_START);
            setDir([0, -1]);
            setSpeed(SPEED);
            setGameOver(false);
    };
    

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = "pink";
        snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
        context.fillStyle = "lightblue";
        context.fillRect(apple[0], apple[1], 1, 1);
        
    }, [snake, apple, gameOver]);

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