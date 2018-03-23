var io = require('socket.io');

function socket(server) {
    io = io(server);

    io.on('connection', socket => {
        console.log('New player connected');

    });
}

module.exports = socket;