import io from 'socket.io-client';

const SERVER_URL = 'http://gi1.univ-lr.fr:7777'; 

export default function clientSocket() {
    io.connect(SERVER_URL);
}