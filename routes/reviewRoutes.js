const express = require('express');
const Review = require('../models/review');
const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add new review
router.post('/', async (req, res) => {
    const { reviewerId, revieweeId, feedback, reviewerName, revieweeName } = req.body;
    const newReview = new Review({ reviewerId, revieweeId, feedback, reviewerName, revieweeName });

    try {
        const savedReview = await newReview.save();
        res.json(savedReview);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
