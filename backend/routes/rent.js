const router = require("express").Router();
//const { response } = require("express");
let Rent = require("../models/rent/rent");

//create

router.route("/add").post((req,res)=>{

    const vehicle_no = req.body.vehicle_no;
    const brand = req.body.brand;
    const vehicle_model = req.body.vehicle_model;
    const milage = Number(req.body.milage);
    const capacity = req.body.capacity;
    const description = req.body.description;
    const receive_date = new Date(req.body.receive_date);
    const return_date = new Date(req.body.return_date);
    const owner_name = req.body.owner_name;
    const owner_phone = Number(req.body.owner_phone);
    const owner_email = req.body.owner_email;
    const rental = Number(req.body.rental); 


    const newRent = new Rent({

        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental
    })

    newRent.save().then(()=>{
        res.json("Rent Vehicle Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//read

router.route("/").get((req,res)=>{

    Rent.find().then((rent)=>{
        res.json(rent)
    }).catch((err)=>{
        console.log(err)
    })
})

//update

router.route("/update/:id").put(async (req, res)=>{
    let userID = req.params.id;
    
    const {
        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental
        
        }= req.body;

    const updateRent = {
        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental
    }

   /*  const update = await Rent.findByIdAndUpdate(userID, updateRent)
    .then(()=>{
        res.status(200).send({status: "Vehicle Updated"})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    }) */

    const update = await Rent.findOneAndUpdate({vehicle_no : userID}, updateRent)
    .then(() => {
        res.status(200).send({status: "Rent updated successfully!!!!!!!"});
}).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Not updated. Error in the Update!!!!", error: err.message});
})
})

//delete

router.route("/delete/:id").delete(async (req, res)=>{
    let userID = req.params.id;

    /* await Rent.findByIdAndDelete(userID)
    .then(()=>{
        res.status(200).send({status: "Vehicle Deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    }) */
    await Rent.findOneAndDelete({vehicle_no : userID})
    .then(() =>{
        res.status(200).send({status :"Rent Deleted Successfully!!!!!!"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not deleted. Error in the delete!!!!", error: err.message});
    })

})

/* router.route("/get/:id").get(async (req, res) =>{
    let userId = req.params.id;
    const user = await Rent.findById(userId)
    .then(()=>{
        res.status(200).send({status: "User fetched", user: user})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Vehicle", error: err.message});
    })
}) */

router.route('/get/:id').get(async (req, res) => {
    try {
      const userId = req.params.id;
      const rent = await Rent.findOne({ vehicle_no: userId });
      
      if (!rent) {
        return res.status(404).send({ status: 'Rent Data Not Found' });
      }
  
      res.status(200).send({ status: 'Rent Data Successfully Fetched!!!!!!', rent });
    } catch (err) {
      console.error(err);
      res.status(500).send({ status: 'Error in Fetching Rent Data', error: err.message });
    }
  });

module.exports = router;
