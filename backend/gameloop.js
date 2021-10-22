const constant=require("./constants")

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
    }

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.fillStyle = "pink";
    })
gameloop=(snake)=>
{
    const snakeCopy= JSON.parse(JASON.stringify(snake));
    moveSnake(snakeCopy);
    snakeCopy.unshift(newSnakeHead);
    console.log('x:' , snakeCopy[0][0],'y:',snakeCopy[0][1])
    if (checkCollision(newSnakeHead)) 
    { 
        //endGame();

    }
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
    
}