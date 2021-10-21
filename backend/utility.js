// given array, find first empty index
const getRandomId = function (AllSnakes) {
    for(let i = 0; i < AllSnakes.length; i ++){
        if (AllSnakes[i] == 0)
            return i
    }
}

const getEmptyCoords = function (stateBoard) {
    // console.log(stateBoard)
    temp_x = Math.floor(Math.random() * 20);
    temp_y = Math.floor(Math.random() * 20);
    console.log(temp_x, temp_y)
    console.log(stateBoard[5])
    
    // while (stateBoard[temp_x, temp_y] !== 0 && stateBoard[temp_x, temp_y+1] !== 0){
    //     temp_x = Math.floor(Math.random() * 20);
    //     temp_y = Math.floor(Math.random() * 20);
    // } 
    
    // return [[temp_x, temp_y], [temp_x, temp_y+1]]
    // return 0
}

// let arr = new Array(10).fill(1)
// arr[7] = 0
// console.log(getRandomId(arr))
// console.log(arr.includes(0))

module.exports = {getRandomId, getEmptyCoords}