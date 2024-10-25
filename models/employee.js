const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    role: String,
    username: { type: String, unique: true },
    password: String
});

module.exports = mongoose.model('Employee', employeeSchema);
