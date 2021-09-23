import React, { useState, useRef, useEffect } from "react";
import {
    CANVAS_SIZE,
    SNAKE_START,
    APPLE_START,
    SCALE,
    SPEED,
    DIRECTIONS
  } from "./constants";
import auth from './../components/auth';
import { useInterval } from "./useInterval";

export const SuccessLogin = (props) => {
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    var myVar = 0;

    useInterval(() => gameLoop(), speed);

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
      };
    
    const moveSnake = () =>
    {
        let upleftright = [37, 38, 39]
        let downleftright = [37, 39, 40]
        let updownleft = [37, 38, 40]
        let updownright = [38, 39, 40]

        let nextmove = 0;
        //down
        if (dir == DIRECTIONS[40]) {
        nextmove = downleftright[Math.floor(Math.random() * downleftright.length)];
        }
        //up
        else if (dir == DIRECTIONS[38]) {
        nextmove = upleftright[Math.floor(Math.random() * upleftright.length)];
        }
        //right
        else if (dir == DIRECTIONS[39]) {
        nextmove = updownright[Math.floor(Math.random() * updownright.length)];
        }
        //left
        else {
        nextmove = updownleft[Math.floor(Math.random() * updownleft.length)];
        }
        console.log("move", dir, DIRECTIONS[nextmove], nextmove)
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
        // console.log("HERE", piece, segment)
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
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    moveSnake();
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    console.log("collision", snakeCopy, dir)
    if (checkCollision(newSnakeHead)) {
        endGame();
    };
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
    };

    const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);     //cause issues bc snake can do down as first move
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