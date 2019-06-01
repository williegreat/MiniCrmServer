

class Sockets {

    static connect(server) {
        var io = require("socket.io").listen(server);
        io.on('connection', function (socket) {
            Sockets.socket = socket;
            socket.emit('news', { hello: 'world' });
            socket.on('my other event', function (data) {
                console.log(data);
            });
        });
    }

    static sendMsg() {
        Sockets.socket.emit('news', { hello: 'world' });
    }
}

module.exports = Sockets;