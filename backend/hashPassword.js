const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User'); // Adjust the path based on your structure

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

(async () => {
  try {
    const email = "john@example.com"; // Replace with the user's email
    const plainPassword = "password123"; // Replace with the plain text password

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Update the user's password in the database
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (user) {
      console.log(`Password for ${email} successfully hashed and updated.`);
    } else {
      console.error(`User with email ${email} not found.`);
    }

    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err);
    mongoose.connection.close();
  }
})();
