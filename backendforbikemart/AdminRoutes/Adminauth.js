const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/adminusers'); 
const generateToken = require('../Utilities/GenerateToken'); // Token generator function

const router = express.Router();

// Admin Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    const token = generateToken(newAdmin);
    res.status(201).json({ message: "Admin registered successfully", token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(admin);
    res.status(200).json({ message: "Admin login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;