const express = require('express');
const router = express.Router();
const Fuelstock = require('../models/fuel/fuelstock.js');

router.get('/', async (req, res) => {
    try {
        const aggregateFuelCosts = await Fuelstock.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$stocked_fuel_date" },
                        year: { $year: "$stocked_fuel_date" },
                        fuelType: "$stocked_fuel_type"
                    },
                    totalCost: { $sum: "$total_cost" }
                }
            }
        ]);

        const transformedData = aggregateFuelCosts.map(item => ({
            month: `${item._id.month}-${item._id.year}`,
            [item._id.fuelType]: item.totalCost
        }));

        res.json(transformedData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching monthly fuel costs", error: error.message });
    }
});

module.exports = router;
