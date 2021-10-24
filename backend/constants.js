const CANVAS_SIZE = [1000, 600];
const SNAKE_START = [
  [8, 7],
  [8, 8]
];
const APPLE_START = [4, 3];
const SCALE = 40;
const SPEED = 100;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

const upleft = [38, 37];
const downleft = [40, 37];
const upright = [38, 39];
const downright = [40, 39];
const up = [38];
const down = [40];
const left = [37];
const right = [39];

const newSpawn=(player)=>
{
  
  var newCord=[Math.floor((CANVAS_SIZE[0]/SCALE)*Math.random()),Math.floor((CANVAS_SIZE[1]/SCALE)*Math.random())];
  for(var i = 0;i<player.size;i++)
  {
    if(newCord[0]===player[i][0])
    {
      newCord[0]=Math.floor((CANVAS_SIZE[0]/SCALE)*Math.random);
      i=0;
    }
    if(newCord[0]===player[i][1])
    {
      newCord[1]=Math.floor((CANVAS_SIZE[1]/SCALE)*Math.random);
      i=0;
    }
  }
  return newCord;

}

module.exports = {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  upleft,
  upright,
  downleft,
  downright,
  up,
  down,
  left,
  right,
  // DIRECTIONS_3PAIR,
  // DIRECTIONS_2PAIR
};
