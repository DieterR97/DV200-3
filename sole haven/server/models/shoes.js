const mongoose = require('mongoose');

const ShoeSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    color: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateLaunched: {
        type: Date,
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
    imgUrl: {
        type: Array,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Shoe", ShoeSchema);
