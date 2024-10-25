const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
