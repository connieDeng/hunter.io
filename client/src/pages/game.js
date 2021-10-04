import React, { useState, useRef, useEffect } from "react";
import {
    CANVAS_SIZE,
    APPLE_START,
    SCALE,
    SPEED,
    DIRECTIONS,
    SNAKE_START,
    BOT_START
  } from "./../helper_function/constants";
import auth from './../components/auth';
import { useInterval } from "../helper_function/useInterval";
import { BotSnake } from "../components/bot-snake";
import { LandingPage } from "./landing-page";
import socket from '../socket';

export const Game = (props) => {
    const canvasRef = useRef();
    const [userSnake, setUserSnake] = useState(SNAKE_START);
    const [botSnake, setBotSnake] = useState(BotSnake);
    // const [apple, setApple] = useState(APPLE_START);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(null);

    // var myVar = 0;

    useInterval(() => gameLoop(), speed);

    // const endGame = () => {
    //     setSpeed(null);
    //     setGameOver(true);
    //   };
    
    // const createApple = () =>
    //     apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

    // const checkAppleCollision = newSnake => {
    // if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
    //     let newApple = createApple();
    //     while (checkCollision(newApple, newSnake)) {
    //     newApple = createApple();
    //     }
    //     setApple(newApple);
    //     return true;
    // }
    // return false;
    // };

    const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(userSnake));
    const snakeCopy2 = JSON.parse(JSON.stringify(botSnake));
    // const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    // snakeCopy.unshift(newSnakeHead);
    // console.log("collision", snakeCopy, dir)
    // if (checkCollision(newSnakeHead)) {
    //     endGame();
    // };
    // if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    // setSnake(snakeCopy);
    };

    const startGame = () => {
    setUserSnake(SNAKE_START);
    setBotSnake(botSnake);
    // setApple(APPLE_START);
    // setDir([0, -1]);
    setSpeed(SPEED);
    // setGameOver(false);
    };
    

    // useEffect(() => {
    // const context = canvasRef.current.getContext("2d");
    // context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    // context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // context.fillStyle = "pink";
    // snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    // context.fillStyle = "lightblue";
    // context.fillRect(apple[0], apple[1], 1, 1);
    // }, [snake, apple, gameOver]);
    
    return (
        <div>
            <div>You made it: maybe snake game should be here</div> 
            
            <button
                onClick={() => {
                auth.logout(() => {
                    props.history.push("/");
                });
                }}
            >
                Logout
            </button>
            <canvas
                style={{ border: "1px solid black" }}
                ref={canvasRef}
                width={`${CANVAS_SIZE[0]}px`}
                height={`${CANVAS_SIZE[1]}px`}
            />
            {gameOver && <div>GAME OVER!</div>}
            <button onClick={startGame}>Start Game</button>
        </div>
    ); 
}