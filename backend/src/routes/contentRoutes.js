const express = require("express");
const router = express.Router();
const Content = require("../models/Content");

// GET all content
router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// POST new content
router.post("/", async (req, res) => {
  const { title, description, fileUrl, eventDate } = req.body;
  try {
    const newContent = new Content({ title, description, fileUrl, eventDate });
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (err) {
    res.status(400).json({ error: "Failed to create content" });
  }
});

// DELETE content by ID
router.delete("/:id", async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ error: "Content not found" });
    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete content" });
  }
});

module.exports = router;
