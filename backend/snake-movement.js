import {
    DIRECTIONS,
    upright,
    upleft,
    downright,
    downleft,
    up,
    down,
    left,
    right,
    // DIRECTIONS_2PAIR,
    // DIRECTIONS_3PAIR,
  } from "./constants";

export function findNextStep(dir, snake, apple) {

    let upleftright =  [38, 37, 39];
    let downleftright = [40, 39, 37];
    let updownleft = [38, 40, 37];
    let updownright = [38, 40, 39];
  
    let nextmove = 0;
  
    var appleNear = checkAppleNearBy(snake, apple);
    if (appleNear[0] === true) {
      nextmove = appleNear[1][Math.floor(Math.random() * appleNear[1].length)];
  
      while (checkOpposite(DIRECTIONS[nextmove], dir)) {
        nextmove = appleNear[1][Math.floor(Math.random() * appleNear[1].length)];
        if ((DIRECTIONS[nextmove] === dir)) {
          break;
        }
        if (checkOpposite(DIRECTIONS[nextmove], dir) === false) {
          break;
        }
      }
    }
    else {
      //down
      if (dir === DIRECTIONS[40]) {
        nextmove = downleftright[Math.floor(Math.random() * downleftright.length)];
      }
      //up
      else if (dir === DIRECTIONS[38]) {
        nextmove = upleftright[Math.floor(Math.random() * upleftright.length)];
      }
      //right
      else if (dir === DIRECTIONS[39]) {
        nextmove = updownright[Math.floor(Math.random() * updownright.length)];
      }
      //left
      else {
        nextmove = updownleft[Math.floor(Math.random() * updownleft.length)];
      }  
    }
    return nextmove;
  }
  
  
  export function checkAppleNearBy(snake, apple) {
    //checks if near by on x-axis
    if (Math.abs(snake[0][0] - apple[0]) < 10) {
        if ((snake[0][0] - apple[0]) > 0) {     //left
          return (((snake[0][1] - apple[1]) >= 0) ? [true, upleft] : [true, downleft])          
        }
        else if ((snake[0][0] - apple[0]) < 0) {    //right
          return (((snake[0][1] - apple[1]) >= 0) ? [true, upright] : [true, downright])
        }
        else {      //same x axis
          if ((snake[0][1] - apple[1]) > 0) {     //up
            return [true, up]
          }
          else {
            return [true, down]
          }
        }
    }
    
    //checks if near by on y-axis
    else if ((Math.abs(snake[0][1] - apple[1])) < 10) {
        if ((snake[0][1] - apple[1]) > 0) {     //up
          return (((snake[0][0] - apple[0]) >= 0) ? [true, upleft] : [true, upright])
        }
        else if ((snake[0][1] - apple[1]) < 0) {  //down
          return (((snake[0][0] - apple[0]) >= 0) ? [true, downleft] : [true, downright])
        }
        else {      //same y axis
          if ((snake[0][0] - apple[0]) > 0) {   //left
            return [true, left]
          }
          else {
            return [true, right]
          }
        }
    }
    else {
        return [false, 0];
    }
  }
  
  export function checkOpposite(nextmove, currentmove) {
    if (((nextmove === DIRECTIONS[38]) && ((currentmove === DIRECTIONS[40]))) || ((nextmove === DIRECTIONS[40]) && (currentmove === DIRECTIONS[38])) || ((nextmove === DIRECTIONS[37]) && (currentmove === DIRECTIONS[39])) || ((nextmove === DIRECTIONS[39]) && (currentmove === DIRECTIONS[37]))) {
      return true;
    }
    else {
      return false;
    }
  }