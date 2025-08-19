const express = require('express');
const Leave = require('../models/Leave');
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find().populate("doctorID");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add leave
router.post("/", async (req, res) => {
  try {
    const { doctorID, startDate, endDate, reason } = req.body;
    const newLeave = new Leave({ doctorID, startDate, endDate, reason });
    await newLeave.save();
    res.json({ message: "Leave added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;