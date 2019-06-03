var router = require('express').Router();
var mongoose = require('mongoose');
var auth = require('../auth');
var Customer = mongoose.model('Customer');

router.get('/', auth.optional, async (req, res, next) => {
    let customers = await Customer.find({});
    return res.send(customers);
});

router.post('/', auth.optional, async (req, res, next) => {
    console.log(req);

    let customer = new Customer(req.body.customer);
    await customer.save();

    let customers = await Customer.find({});
    return res.send(customers);
});


router.put('/', auth.optional, async (req, res, next) => {

    const updatedCustomer = {
        address : req.body.customer.address,
        name : req.body.customer.name
    };

    Customer.update({ '_id': req.body.customer._id }, updatedCustomer, { upsert: true }, async (err, doc) => {
        if (err) {
            return res.send(500, { error: err });
        }
        let customers = await Customer.find({});
        return res.send(customers);
    });
});

router.delete('/:id', auth.optional, async (req, res, next) => {

    let customer = await Customer.findById(req.params.id);
    await customer.remove();

    let customers = await Customer.find({});
    return res.send(customers);
});

module.exports = router;