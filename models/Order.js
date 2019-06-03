var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: [true, "can't be blank"] },
    customerId: { type: String, required: [true, "can't be blank"] },
    description: { type: String },
    quantity: { type: Number, default: 0 }
}, { timestamps: true });

mongoose.model('Order', OrderSchema);