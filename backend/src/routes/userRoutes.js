const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Ticket = require('../models/Ticket'); // Import the Ticket model

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt received:', email, password); // Debugging log

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found'); // Debugging log
            return res.status(400).send('Invalid login credentials.');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match'); // Debugging log
            return res.status(400).send('Invalid login credentials.');
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Include user's role and name in the response
        res.json({ token, role: user.role, firstName: user.firstName });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Server error');
    }
});

// Get All Users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Server error');
    }
});

// Get Users with Pending Tickets
router.get('/with-tickets', async (req, res) => {
    try {
        const users = await User.find().lean(); // Fetch all users
        const tickets = await Ticket.find({ status: 'Open' }); // Fetch open tickets

        // Attach tickets to their respective users
        const usersWithTickets = users.map((user) => ({
            ...user,
            tickets: tickets.filter((ticket) => ticket.email === user.email),
        }));

        res.json(usersWithTickets);
    } catch (err) {
        console.error('Error fetching users with tickets:', err);
        res.status(500).send('Server error');
    }
});

// Update User Role
router.put('/:id/role', async (req, res) => {
    const { role } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        user.role = role;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error('Error updating user role:', err);
        res.status(500).send('Server error');
    }
});

// Toggle Active/Inactive Status
router.put('/:id/toggle-active', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        user.isActive = !user.isActive;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error('Error toggling active status:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;