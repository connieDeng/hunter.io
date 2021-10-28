const { io } = require("socket.io-client");

const ENDPOINT = process.env.NODE_ENV !== "production" ? 'http://localhost:4000':'/';
console.log(io)
module.exports = io(ENDPOINT);