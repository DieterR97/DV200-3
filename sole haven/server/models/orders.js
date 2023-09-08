const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    Amount: {
        type: Number,
        required: true
    },
    Size: {
        type: Number,
        required: true
    },
    User: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Order", OrderSchema);
