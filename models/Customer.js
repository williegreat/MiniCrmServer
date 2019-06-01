var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var CustomerSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    address: { type: String }
}, { timestamps: true });

CustomerSchema.plugin(uniqueValidator, { message: 'is already taken' });

CustomerSchema.methods.toJSONFor = function (user) {
    return {
        _id: this._id,
        name: this.name,
        address: this.address
    };
};

mongoose.model('Customer', CustomerSchema);