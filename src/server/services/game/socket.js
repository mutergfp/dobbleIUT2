var io = require('socket.io');

function socket(server) {
    io = io(server);

    io.on('connection', socket => {
        console.log('New guy connected');
    });

    function broadcastInit(event) {
        console.log('init game');
        io.sockets.emit(event.name, event.data);
    }

    function broadcastStart(event) {
        console.log('start game');
        io.sockets.emit(event.name, event.data);
    }

    function braodcastUpdateScore(event) {
        console.log('update score');
        io.sockets.emit(event.name, event.data);
    }

    function broadcastUpdateBoard(event) {
        console.log('update board');
        io.sockets.emit(event.name, event.data);
    }

    function broadcastFinish(event) {
        console.log('finish game');
        io.sockets.emit(event.name, event.data);
    }

    events.on('game/init', broadcastInit);
    events.on('game/start', broadcastStart);
    events.on('game/updateScore', braodcastUpdateScore);
    events.on('game/updateBoard', broadcastUpdateBoard);
    events.on('game/finish', broadcastFinish);
}

module.exports = socket;