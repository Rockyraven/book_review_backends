const mongoose = require('mongoose');
const userModal = require('./userModal');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: userModal,
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    }
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Book', bookSchema);

