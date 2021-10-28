const { io } = require("socket.io-client");

const ENDPOINT = 'http://localhost:4000';
console.log(io)
module.exports = io(ENDPOINT);