const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' },
    adminResponse: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to User model
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);