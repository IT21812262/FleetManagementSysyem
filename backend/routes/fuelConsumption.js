const express = require('express');
const router = express.Router();
const FuelConsumption = require('../models/fuel/fuelConsumtion');

// Route to add fuel consumption data

router.route("/add").post((req, res) => {
  const vehicle_id = req.body.vehicle_id;
  const fuel_type = req.body.fuel_type;
  const fuel_quantity = new Number(req.body.fuel_quantity);
  const estimatedConsumption =  new Number(req.body.estimatedConsumption);
  const actualConsumption = new Number(req.body.actualConsumption);
  const difference = new Number(req.body.difference);
  const status = req.body.difference;
    

    const newFuelConsumption = new FuelConsumption({
        
        vehicle_id,
        fuel_type,
        fuel_quantity,
        estimatedConsumption,
        actualConsumption,
        difference,
        status
    })

  newFuelConsumption.save().then(() => {
      res.json("New Fuelconsumption details are successfully added ")
  }).catch ((err) => {
    console.log(err)
  })
})

router.route("/:vehicle_id").get((req, res) => {
  FuelConsumption.findOne({ vehicle_id: req.params.vehicle_id })
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to update fuel consumption data for a specific vehicle
router.route("/update/:vehicle_id").put((req, res) => {
  FuelConsumption.findOneAndUpdate({ vehicle_id: req.params.vehicle_id }, req.body)
    .then(() => res.json('Fuel consumption data updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to delete fuel consumption data for a specific vehicle
router.route("/:vehicle_id").delete((req, res) => {
  FuelConsumption.findOneAndDelete({ vehicle_id: req.params.vehicle_id })
    .then(() => res.json('Fuel consumption data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Route to check if fuel consumption data for a specific vehicle already exists
router.route("/unique/:vehicle_id").get((req, res) => {
  FuelConsumption.findOne({ vehicle_id: req.params.vehicle_id })
    .then(data => {
      if (data) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;