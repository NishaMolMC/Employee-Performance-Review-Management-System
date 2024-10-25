const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    revieweeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    feedback: String,
    reviewerName: String,
    revieweeName: String
});

module.exports = mongoose.model('Review', reviewSchema);
