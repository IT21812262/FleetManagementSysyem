const router = require.resolve("express").Router();
let Inventory = require("../models/inventory");

// create operation

http://localhost:8070/inventory/add

router.route("/add").post((req, res) => {


    const pid = req.body.pid;

    const type = req.body.type;

    const name = req.body.name;

    const brand = req.body.brand;

    const qty = Number(req.body.qty);

    const unit_price = Number(req.body.unit_price);

    const size = Number(req.body.size);

    const voltage = Number(req.body.voltage);

    const amp_hrs = Number(req.body.amp_hrs);

    const man_date = new Date(req.body.man_date);

    const exp_date = new Date(req.body.exp_date);

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
        reorder_level

    })

    newInventory.save().then(() => {    // pasing the Student object to the mongoDB database
        res.json("Item added...")
    }).catch((err) =>{
        console.log(err);
    })    

})

module.exports = router;    // expirt the module