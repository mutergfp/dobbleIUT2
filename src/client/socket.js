import io from 'socket.io-client';

const SERVER_URL = 'http://gi1.univ-lr.fr:7777'; 

export default function clientSocket(whenInit, whenStart, whenUpdateScore, whenUpdateBoard, whenFinish) {
    var socket = io.connect(SERVER_URL);
    
    socket.on('game/init', whenInit);
    socket.on('game/start', whenStart);
    socket.on('game/updateScore', whenUpdateScore);
    socket.on('game/updateBoard', whenUpdateBoard);
    socket.on('game/finish', whenFinish);
}