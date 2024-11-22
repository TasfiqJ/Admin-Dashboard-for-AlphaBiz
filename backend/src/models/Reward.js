const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pointsRequired: { type: Number, required: true },
  description: { type: String },
  available: { type: Boolean, default: true },
});

const redemptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rewardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  requestedAt: { type: Date, default: Date.now },
});

module.exports = {
  Reward: mongoose.model('Reward', rewardSchema),
  Redemption: mongoose.model('Redemption', redemptionSchema),
};
