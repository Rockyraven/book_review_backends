const express = require("express");
const bookModal = require("../modal/bookModal");
const userModal = require("../modal/userModal");

const getAllBook = async (req, res) => {
    try {
        const books = await bookModal.find({});
        // console.log(books);
        res.status(200).json({status: "success", data: books})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "some went wrong"})
    }
}

const createReview = async (req, res) => {
    const { bookId } = req.params;
    const userId = req.userId;
    const { comment, rating } = req.body;

    console.log(bookId, { userId, comment, rating });

    try {
        // Fetch the book by ID
        const book = await bookModal.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Ensure the user exists
        const user = await userModal.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the new review
        const newReview = {
            user: userId,
            comment,
            rating,
        };

        console.log(newReview);

        // Add the review to the book's reviews array
        book.reviews.push(newReview);

        // Recalculate the average rating
        const totalRatings = book.reviews.reduce((acc, review) => acc + review.rating, 0);
        book.averageRating = totalRatings / book.reviews.length;

        // Save the updated book
        await book.save();

        res.status(201).json({ message: 'Review added successfully', book });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getReview = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Find the book by ID and populate the user field in reviews
        const book = await bookModal.findById(bookId).populate({
            path: 'reviews.user',
            select: 'username' // Only select the username field from the user
        });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const reviews = book.reviews.map(review => ({
            comment: review.comment,
            rating: review.rating,
            username: review.user.username
        }));

        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {getAllBook, createReview, getReview};