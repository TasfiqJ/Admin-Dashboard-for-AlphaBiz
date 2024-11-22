const express = require('express');
const Ticket = require('../models/Ticket');

const router = express.Router();

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        console.error('Error fetching tickets:', err);
        res.status(500).send('Server error');
    }
});

// Create a new ticket (dummy client-side simulation)
router.post('/', async (req, res) => {
    const { clientName, email, subject, message } = req.body;
    try {
        const newTicket = new Ticket({ clientName, email, subject, message });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        console.error('Error creating ticket:', err);
        res.status(500).send('Server error');
    }
});

// Respond to a ticket
router.put('/:id/response', async (req, res) => {
    const { response } = req.body;
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).send('Ticket not found');

        ticket.adminResponse = response;
        await ticket.save();
        res.json(ticket);
    } catch (err) {
        console.error('Error responding to ticket:', err);
        res.status(500).send('Server error');
    }
});

// Mark ticket as resolved
router.put('/:id/resolve', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).send('Ticket not found');

        ticket.status = ticket.status === 'Open' ? 'Resolved' : 'Open';
        await ticket.save();
        res.json(ticket);
    } catch (err) {
        console.error('Error resolving ticket:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
