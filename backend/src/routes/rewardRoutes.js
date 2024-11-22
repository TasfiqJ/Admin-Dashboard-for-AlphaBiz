const express = require('express');
const { Reward, Redemption } = require('../models/Reward');
const User = require('../models/User');

const router = express.Router();

// Get all rewards
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    console.error('Error fetching rewards:', err);
    res.status(500).send('Server error');
  }
});

// Add a new reward
router.post('/', async (req, res) => {
  try {
    const { name, pointsRequired, description } = req.body;
    const reward = new Reward({ name, pointsRequired, description });
    await reward.save();
    res.json(reward);
  } catch (err) {
    console.error('Error adding reward:', err);
    res.status(500).send('Server error');
  }
});

// Adjust user points
router.put('/points/:userId', async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('User not found');
    user.loyaltyPoints = points;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Error adjusting points:', err);
    res.status(500).send('Server error');
  }
});

// Get all redemptions
router.get('/redemptions', async (req, res) => {
  try {
    const redemptions = await Redemption.find().populate('userId rewardId');
    res.json(redemptions);
  } catch (err) {
    console.error('Error fetching redemptions:', err);
    res.status(500).send('Server error');
  }
});

// Approve or reject a redemption
router.put('/redemptions/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const redemption = await Redemption.findById(req.params.id);
    if (!redemption) return res.status(404).send('Redemption not found');
    redemption.status = status;
    await redemption.save();
    res.json(redemption);
  } catch (err) {
    console.error('Error updating redemption:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
