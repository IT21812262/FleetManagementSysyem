const router = require("express").Router();
let FuelEntry = require("../models/fuel/fuel_entry");

//ALL FUEL ENTRY CRUD OPERATION

//CREATE PART
/*http://Localhost:8411/fuel/add*/

router.route("/add").post((req, res) => {
    
    const vehicle_id = req.body.vehicle_id;
    const fuel_date = new Date(req.body.fuel_date);
    const fuel_type = req.body.fuel_type;
    const fuel_quantity = req.body.fuel_quantity;
    const fuel_cost = new Number(req.body.fuel_cost);
    const vehicle_milage = new Number(req.body.vehicle_milage);
    

    const newFuelEntry = new FuelEntry({
        
        vehicle_id,
        fuel_date,
        fuel_type,
        fuel_quantity,
        fuel_cost,
        vehicle_milage
    })

    newFuelEntry.save().then(() => {
        res.json("New Fuel details are successfully added ",newFuelEntry)
    }).catch((err) => {
        console.log(err)
    })
   
})

module.exports = router;