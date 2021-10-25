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

const getEmptyCoords = function (stateBoard) {
    // console.log(stateBoard)
    temp_x = Math.floor(Math.random() * stateBoard.length);
    temp_y = Math.floor(Math.random() * stateBoard[0].length);
    
    while (stateBoard[temp_x][temp_y] !== -1 && stateBoard[temp_x+1][temp_y] !== -1){
        temp_x = Math.floor(Math.random() * 20);
        temp_y = Math.floor(Math.random() * 20);
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

module.exports = {getRandomId, getEmptyCoords, createStateBoard, createDict}