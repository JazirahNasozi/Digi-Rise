const express = require("express");
const router = express.Router();
const Website = require("../models/website");

// @route   GET /api/websites
// @desc    Get all websites
router.get("/", async (req, res) => {
  try {
    const websites = await Website.find();
    res.json(websites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/websites
// @desc    Add a new website
router.post("/", async (req, res) => {
  try {
    const website = new Website(req.body);
    await website.save();
    res.status(201).json(website);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/websites/:id
// @desc    Get single website by ID
router.get("/:id", async (req, res) => {
  try {
    const website = await Website.findById(req.params.id);
    if (!website) return res.status(404).json({ msg: "Website not found" });
    res.json(website);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/websites/:id
// @desc    Delete a website
router.delete("/:id", async (req, res) => {
  try {
    const website = await Website.findByIdAndDelete(req.params.id);
    if (!website) return res.status(404).json({ msg: "Website not found" });
    res.json({ msg: "Website deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

