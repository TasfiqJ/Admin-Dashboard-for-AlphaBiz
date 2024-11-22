const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found.');

    user.role = role;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
