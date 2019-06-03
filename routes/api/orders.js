var router = require('express').Router();
var auth = require('../auth');
var Sockets = require('../../sockets');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

// var io = require("socket.io").listen(server);

// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });

// router.get('/', auth.optional, function (req, res, next) {
//     Sockets.sendMsg();
//     return res.json({ as: '2' });
// });


router.get('/', auth.optional, async (req, res, next) => {
    let orders = await Order.find({});
    return res.send(orders);
});

router.get('/:customerId', auth.optional, async (req, res, next) => {
    let orders = await Order.find({ 'customerId': req.params.customerId });
    return res.send(orders);
});

router.post('/', auth.optional, async (req, res, next) => {
    console.log(req);

    let order = new Order(req.body.order);
    await order.save();

    if (!req.body.customerId) {
        let orders = await Order.find({});
        return res.send(orders);
    }
    else {
        let orders = await Order.find({ 'customerId': req.body.customerId });
        return res.send(orders);
    }
});


router.put('/', auth.optional, async (req, res, next) => {
    const updatedOrder = {
        customerId: req.body.order.customerId,
        //orderId : req.body.order.orderId
        quantity: req.body.order.quantity,
        description: req.body.order.description
    };

    Order.update({ '_id': req.body.order._id }, updatedOrder, { upsert: true }, async (err, doc) => {
        if (err) {
            return res.send(500, { error: err });
        }

        if (!req.body.customerId) {
            let orders = await Order.find({});
            return res.send(orders);
        }
        else {
            let orders = await Order.find({ 'customerId': req.body.customerId });
            return res.send(orders);
        }
    });
});

router.delete('/:id', auth.optional, async (req, res, next) => {

    let order = await Order.findById(req.params.id);
    await order.remove();

    let orders = await Order.find({});
    return res.send(orders);
});

module.exports = router;