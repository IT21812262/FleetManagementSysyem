const router = require("express").Router();
let Inventory = require("../models/inventory/inventory");

// create operation

http://localhost:8411/inventory/add

router.route("/add").post((req, res) => {


    const pid = req.body.pid;

    const type = req.body.type;

    const name = req.body.name;

    const brand = req.body.brand;

    const qty = Number(req.body.qty);

    const unit_price = Number(req.body.unit_price);

    const size = req.body.size;

    const voltage = Number(req.body.voltage);

    const amp_hrs = Number(req.body.amp_hrs);

    const man_date = new Date(req.body.man_date);

    const exp_date = new Date(req.body.exp_date);

    const vehicle_brand_and_model = req.body.vehicle_brand_and_model;

    const vehicle_man_year = Number(req.body.vehicle_man_year);

    const reorder_level = Number(req.body.reorder_level);



    const newInventory = new Inventory({

        pid,
        type,
        name,
        brand,
        qty,
        unit_price,
        size,
        voltage,
        amp_hrs,
        man_date,
        exp_date,
        vehicle_brand_and_model,
        vehicle_man_year,
        reorder_level

    })

    newInventory.save().then(() => {    // pasing the Student object to the mongoDB database
        res.json("Item added...", newInventory)
    }).catch((err) =>{
        console.log(err);
    })    

})



// retrieve all operation 

http://localhost:8411/inventory/


router.route("/").get((req, res) => {

    Inventory.find().then((inventory) => {
        res.json(inventory)
    }).catch((err) => {
        console.log(err)
    })

})






// update operation

http://localhost:8411/inventory/update

router.route("/upodate/:id").put(async (req, res) => {

    let itemId = req.params.id;     // fetch the id value which is coming in the parameter of request

    // using destructure method

    const {pid, type, name, brand, qty, unit_price, size, voltage, amp_hrs, man_date, exp_date,vehicle_brand_and_model, vehicle_man_year, reorder_level } = req.body;

    const updateInventory = {

        pid,
        type,
        name,
        brand,
        qty,
        unit_price,
        size,
        voltage,
        amp_hrs,
        man_date,
        exp_date,
        vehicle_brand_and_model,
        vehicle_man_year,
        reorder_level

    }


    const update = await Inventory.findByIdAndUpdate(itemId, updateInventory).then(() => {       // waiting until promise come


        res.status(200).send({status: "Item updated...", user: update})  // updating and send the updated details into the frontend

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }) 
    

})

// 404 - not found
// 200 - success
// 441 - unauthorized





// delete operation

http://localhost:8411/inventory/delete

router.route("/delete/:id").delete(async(req, res) => {

    let itemId = req.params.id;

    await Inventory.findByIdAndDelete(itemId).then(() => {

        res.status(200).send({status: "Item deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting item"});
    })
})



// retrieve only single item operation

http://localhost:8411/inventory/

router.route("/get/:id").get(async (req, res) => {

    let itemId = req.params.id;

    const item = await Inventory.findByIdAndDelete(itemId).then((inventory) => {

        res.status(200).send({status: "Item fetched...", inventory});
    }).catch((err) => {
        console.log("err.message");
        res.status(500).send({status: "Error with get item...", error: err.message});
    })
})



module.exports = router;    // export the module

