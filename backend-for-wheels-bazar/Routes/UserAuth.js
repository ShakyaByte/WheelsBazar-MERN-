const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/users');
const generateToken = require('../Utilities/GenerateToken');

const router = express.Router();

//  User Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    // ✅ Send back the user's name along with the token
    res.status(200).json({
      message: "Login successful",
      token,
      name: user.name, // displaying the username in response while login*/
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
