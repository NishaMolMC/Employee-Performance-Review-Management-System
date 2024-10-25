const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { name, role, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({ name, role, username, password: hashedPassword });

    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const employee = await Employee.findOne({ username });
        if (employee && await bcrypt.compare(password, employee.password)) {
            const token = jwt.sign({ id: employee._id, role: employee.role }, 'secretkey');
            res.json({ token, employee });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
