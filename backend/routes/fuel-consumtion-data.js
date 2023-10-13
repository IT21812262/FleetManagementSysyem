const router = require("express").Router();
let trip = require("../models/trip/trip");
let vehicle = require("../models/vehicle");

router.get('/fuel-consumption-data', async (req, res) => {
    try {
        const tripData = await TripRegistry.find(); // Assuming you have a TripRegistry model
        const vehicleData = await VehicleManagement.find(); // Assuming you have a VehicleManagement model

        // Combine and transform data as needed...

        res.json(combinedData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});
