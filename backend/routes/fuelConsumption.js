const express = require('express');
const router = express.Router();
const FuelConsumption = require('../models/fuel/fuelConsumption');

// Route to add fuel consumption data
router.post('/add', async (req, res) => {
  try {
    const fuelData = new FuelConsumption(req.body);
    const savedData = await fuelData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
