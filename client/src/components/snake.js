import React, { useState, useRef, useEffect } from "react";
/*
SNAKE
    - their own location --> constant update
    - name --> once
    - score --> update when apple is grabbed
    - if they're dead
    - if bot or human
*/

// time interval --> location update
// check collision --> if YES update apple, 
// movement --> BOT 

export const Snake = (props) => {
    console.log(props)
    const [snakeDots, setSnakeDots] = useState(props.snakeDots);
    
    return(
        <div>
        {snakeDots.map((dot, i) => {
            const style = {
                left: `${dot[0]}%`,
                top: `${dot[1]}%`,
                backgroundColor: "black"
            }
            return (
            <div className="snake-dot" key={i} style={style}></div>
            )
        })}
        </div>
    );
}
