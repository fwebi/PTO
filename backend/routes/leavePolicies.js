const express = require("express");
const router = express.Router();
const { LeavePolicy } = require("../models");
const authenticateToken = require("../middleware/authenticateToken");

// Create a new leave policy
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { leaveType, maxDaysPerYear, carryoverAllowed } = req.body;

    // Validate input
    if (!leaveType || !maxDaysPerYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the leave policy
    const leavePolicy = await LeavePolicy.create({
      leaveType,
      maxDaysPerYear,
      carryoverAllowed,
    });

    res.status(201).json({ message: "Leave policy created successfully", leavePolicy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all leave policies
router.get("/", authenticateToken, async (req, res) => {
  try {
    const leavePolicies = await LeavePolicy.findAll();
    res.json(leavePolicies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a leave policy
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { leaveType, maxDaysPerYear, carryoverAllowed } = req.body;

    // Find the leave policy
    const leavePolicy = await LeavePolicy.findByPk(id);
    if (!leavePolicy) {
      return res.status(404).json({ message: "Leave policy not found" });
    }

    // Update the leave policy
    leavePolicy.leaveType = leaveType || leavePolicy.leaveType;
    leavePolicy.maxDaysPerYear = maxDaysPerYear || leavePolicy.maxDaysPerYear;
    leavePolicy.carryoverAllowed = carryoverAllowed ?? leavePolicy.carryoverAllowed;
    await leavePolicy.save();

    res.json({ message: "Leave policy updated successfully", leavePolicy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a leave policy
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the leave policy
    const leavePolicy = await LeavePolicy.findByPk(id);
    if (!leavePolicy) {
      return res.status(404).json({ message: "Leave policy not found" });
    }

    // Delete the leave policy
    await leavePolicy.destroy();

    res.json({ message: "Leave policy deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;