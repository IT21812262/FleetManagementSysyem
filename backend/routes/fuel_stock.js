const router = require("express").Router();
let FuelStock = require("../models/fuel/fuel_stock");

//ALL FUEL ENTRY CRUD OPERATION

//CREATE PART
/*http://Localhost:8411/fuel/add*/

router.route("/fuel_stock/add").post((req, res) => {
    
    const invoice_no = req.body.invoice_no;
    const stocked_fuel_type = req.body.stocked_fuel_type;
    const stocked_fuel_quantity = new Number(req.body.stocked_fuel_quantity);
    const per_leter_cost = new Number(req.body.per_leter_cost);
    const total_cost = new Number(req.body.total_cost);
    const stocked_fuel_date = new Date(req.body.stocked_fuel_date);
    

    const newFuelStock = new FuelStock({
        
      invoice_no,
      stocked_fuel_type,
      stocked_fuel_quantity,
      per_leter_cost,
      total_cost,
      stocked_fuel_date
    })

    newFuelStock.save().then(() => {
        res.json("New Fuel Stock is successfully added")
    }).catch((err) => {
        console.log(err)
    })
   
})

//READ PART
/*http://Localhost:8411/fuel*/

router.route("/fuel_stock").get((req,res) => {
    
    FuelStock.find().then((fuel_stocks) => {
        res.json(fuel_stocks)
    }).catch((err) => {
        console.log(err)
    })
})


//UPDATE PART
/*http://Localhost:8411/fuel/update/id*/ 
router.route("/fuel_stock/update/:id").put(async(req, res) => {
    let invoiceNo = req.params.id;
    const { 
        invoice_no,
        stocked_fuel_type,
        stocked_fuel_quantity,
        per_leter_cost,
        total_cost,
        stocked_fuel_date
        } = req.body;
    
        const updateFuelStock = {
            invoice_no,
            stocked_fuel_type,
            stocked_fuel_quantity,
            per_leter_cost,
            total_cost,
            stocked_fuel_date
        }

        const update = await FuelStock.findByIdAndUpdate(invoiceNo, updateFuelStock)
        .then(() => {
            res.status(200).send({status: "Fuel Stock updated successfully!!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not updated. Error in the Update!!!!", error: err.message});
    })       
})

//DELETE PART
/*http://Localhost:8411/fuel/delete/id*/ 
router.route("/fuel_stock/delete/:id").delete(async(req,res) =>{
    let invoiceNo = req.params.id;

    await FuelStock.findByIdAndDelete(invoiceNo)
    .then(() =>{
        res.status(200).send({status :"Fuel Stock Deleted Successfully!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not deleted. Error in the delete!!!!", error: err.message});
    })
})

//UNIQUE FUEL DATA
router.route("/fuel_stock/get/:id").get(async(req,res) =>{
    let invoiceNo = req.params.id;

    const fuelstock = await FuelStock.findByIdAndDelete(invoiceNo) 
    .then((fuel_stock) =>{
        res.status(200).send({status :"Fuel Stock Successfully Fetched!!!!!!", fuel_stock});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not Fetched. Error in the fuel data Fetched!!!!", error: err.message});
    })
})

module.exports = router;