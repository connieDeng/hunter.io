const { stateBoard } = require("./game");

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
    max = (stateBoard.length)-1
    temp_x = Math.floor((Math.random() * max));
    temp_y = Math.floor((Math.random() * max));

    while (stateBoard[temp_x][temp_y] !== -1){
        temp_x = Math.floor((Math.random() * max));
        temp_y = Math.floor((Math.random() * max));
    }

    return [temp_x, temp_y]
}

const getEmptyCoordsforSnake = function (stateBoard) {
    min_x = stateBoard.length/2;
    max_x = stateBoard.length-2;

    temp_x = Math.floor(Math.random() * (max_x - min_x) + min_x);
    temp_y = Math.floor(Math.random() * stateBoard.length-2);
    
    while (stateBoard[temp_x][temp_y] !== -1 && stateBoard[temp_x+1][temp_y] !== -1){
        temp_x = Math.floor(Math.random() * (max_x - min_x) + min_x);
        temp_y = Math.floor(Math.random() * stateBoard.length-2);
    } 

    return [temp_x, temp_y]
}

const createStateBoard = function (rows, cols) {
    var stateBoard = [];
    for(var i=0; i<rows; i++) {
        stateBoard[i] = new Array(cols).fill(-1);
    }
    return stateBoard
}

const returnSnake = function (socket_id, playerDict){
    return playerDict[socket_id]
}

const sortOnVals = (dict) => {
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key], dict[key].score, dict[key].nickname];
    });
    
    // Sort the array based on the second element
    items.sort(function(first, second) {
    return second[2] - first[2];
    });     

    return items;
}

module.exports = {getRandomId, createStateBoard, createDict, returnSnake, getEmptyCoordsforApple, getEmptyCoordsforSnake, sortOnVals}