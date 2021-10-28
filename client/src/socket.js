const io = require("socket.io-client");

const ENDPOINT = 'http://localhost:4000';

module.exports = io(ENDPOINT);