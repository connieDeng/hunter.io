// given array, find first empty index
const getRandomId = function (dict) {
    for (const [key, value] of Object.entries(dict)) {
        if (value === null){
            return key;
        }
    }
}

const createDict = function(num) {
    let dict = {};
    for (let i = 0; i < num; i++) {        
        dict[i] = null
    }
    return dict
}

const getEmptyCoordsforApple = function (stateBoard) {
    // console.log(stateBoard)
    temp_x = Math.floor(Math.random() * stateBoard.length);
    temp_y = Math.floor(Math.random() * stateBoard[0].length);
    
    while (stateBoard[temp_x][temp_y] !== " " && stateBoard[temp_x+1][temp_y] !== " "){
        temp_x = Math.floor(Math.random() * 20);
        temp_y = Math.floor(Math.random() * 20);
    } 
    
    return [temp_x, temp_y]
}

const getEmptyCoordsforSnake = function (stateBoard) {
    temp_x = Math.floor(Math.random() * stateBoard.length-5) + 5;
    temp_y = Math.floor(Math.random() * stateBoard.length-5) + 5
    console.log(temp_x, temp_y)

    while (stateBoard[temp_x][temp_y] !== " " && stateBoard[temp_x+1][temp_y] !== " "){
        Math.floor(Math.random() * stateBoard.length-5) + 5;
        Math.floor(Math.random() * stateBoard.length-5) + 5;
    } 
    console.log(temp_x, temp_y)
    
    return [temp_x, temp_y]
}

const createStateBoard = function (rows, cols) {
    var stateBoard = [];
    for(var i=0; i<rows; i++) {
        stateBoard[i] = new Array(cols).fill(" ");
    }
    return stateBoard
}

const returnSnake = function (socket_id, playerDict){
    return playerDict[socket_id]
}

module.exports = {getRandomId, createStateBoard, createDict, returnSnake, getEmptyCoordsforApple, getEmptyCoordsforSnake}