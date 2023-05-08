const express = require("express");
const User = require("../models/user");

const router = express.Router();

// User registration
router.post("/register", async (req, res) => {
  const { employeeID, name, faceData } = req.body;

  try {
    const newUser = new User({ employeeID, name, faceData });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
});

// Get user face data
router.get("/face-data", async (req, res) => {
  try {
    const users = await User.find({}, "employeeID name faceData");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching face data", error });
  }
});

// Mark attendance
router.post("/attendance", async (req, res) => {
  const { employeeID, status } = req.body;

  try {
    const user = await User.findOne({ employeeID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.attendance.push({ date: new Date(), status });
    await user.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance", error });
  }
});

router.get("/data", async (_, res) => {
  try {
    const users = await User.find({}, "employeeID name attendance");

    const newUsers = users.map((user) => {
      const { employeeID, name, attendance } = user;
      const newAttendance = attendance.filter((item) => {
        const { date, status, _id } = item;
        return { date, status, _id };
      });
      return { employeeID, name, attendance: newAttendance };
    });

    res.json(newUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

module.exports = router;
