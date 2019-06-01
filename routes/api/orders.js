var router = require('express').Router();
var auth = require('../auth');
var Sockets = require('../../sockets');

// var io = require("socket.io").listen(server);

// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });

router.get('/', auth.optional, function (req, res, next) {
    Sockets.sendMsg();
    return res.json({ as: '2' });
});

module.exports = router;