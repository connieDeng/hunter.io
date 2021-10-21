import React, { useState, useRef, useEffect } from "react";

export const Apple = (props) => {
    console.log(props)
    const [appleDots, setApplesDots] = useState(props.appleDots);
    
    return(
        <div>
        {appleDots.map((dot, i) => {
            const style = {
                left: `${dot[0]}%`,
                top: `${dot[1]}%`,
                backgroundColor: "red"
            }
            return (
            <div className="apple-dot" key={i} style={style}></div>
            )
        })}
        </div>
    );
}
