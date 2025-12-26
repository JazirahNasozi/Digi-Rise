const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Dummy in-memory user store (replace with MongoDB later)
const users = [];

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user exists
    const userExists = users.find(u => u.username === username);
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    // Create token
    const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    res.status(201).json({ token, user: { username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    res.json({ token, user: { username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
