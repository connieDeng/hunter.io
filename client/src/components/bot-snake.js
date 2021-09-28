import React, { useState, useRef, useEffect } from "react";
import {
    BOT_START,
    APPLE_START,
    SCALE,
    SPEED,
    DIRECTIONS
  } from "./../helper_function/constants";
import { useInterval } from "./../helper_function/useInterval";

export const BotSnake = (props) => {
    const [botSnake, setBotSnake] = useState(BOT_START);
    const [apple, setApple] = useState(APPLE_START);
    const [botDir, setBotDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    var myVar = 0;

    // useInterval(() => gameLoop(), speed);

    const moveSnake = () =>
    {
        let upleftright = [37, 38, 39]
        let downleftright = [37, 39, 40]
        let updownleft = [37, 38, 40]
        let updownright = [38, 39, 40]

        let nextmove = 0;
        //down
        if (botDir == DIRECTIONS[40]) {
        nextmove = downleftright[Math.floor(Math.random() * downleftright.length)];
        }
        //up
        else if (botDir == DIRECTIONS[38]) {
        nextmove = upleftright[Math.floor(Math.random() * upleftright.length)];
        }
        //right
        else if (botDir == DIRECTIONS[39]) {
        nextmove = updownright[Math.floor(Math.random() * updownright.length)];
        }
        //left
        else {
        nextmove = updownleft[Math.floor(Math.random() * updownleft.length)];
        }
        console.log("move", botDir, DIRECTIONS[nextmove], nextmove)
        setBotDir(DIRECTIONS[nextmove]);
    }

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

    // const gameLoop = () => {
    // const snakeCopy = JSON.parse(JSON.stringify(botSnake));
    // moveSnake();
    // const newSnakeHead = [snakeCopy[0][0] + botDir[0], snakeCopy[0][1] + botDir[1]];
    // snakeCopy.unshift(newSnakeHead);
    // console.log("collision", snakeCopy, botDir)
    // if (checkCollision(newSnakeHead)) {
    //     endGame();
    // };
    // if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    // setBotSnake(snakeCopy);
    // };

    // const startGame = () => {
    // setBotSnake(BOT_START);
    // setApple(APPLE_START);
    // setBotDir([0, -1]);
    // setSpeed(SPEED);
    // setGameOver(false);
    // };
    

    // useEffect(() => {
    // const context = canvasRef.current.getContext("2d");
    // context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    // context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // context.fillStyle = "pink";
    // botSnake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    // context.fillStyle = "lightblue";
    // context.fillRect(apple[0], apple[1], 1, 1);
    // }, [botSnake, apple, gameOver]);
    
    return (
        <div>
            snake
        </div>
    ); 
}