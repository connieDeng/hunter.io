import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000';
export default io(ENDPOINT);