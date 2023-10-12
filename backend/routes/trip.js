const router = require("express").Router();
let trip = require("../models/trip/trip");

router.route("/add").post((req,res)=>{

    const tripid = Number(req.body.tripid);
    const tripname = req.body.tripname;
    const tripduration = Number(req.body.tripduration);
    const tripdistance = Number(req.body.tripdistance);
    const vehicleno = Number(req.body.vehicleno);
    const driverid = req.body.driverid;
    const startpoint = req.body.startpoint;
    const destination = req.body.destination;
    const tripgoods = req.body.tripgoods;
    const arrivaltime = Number(req.body.arrivaltime);
    const departuretime = Number(req.body.departuretime);

    const newtrip = new trip({

        tripid,
        tripname,
        tripduration,
        tripdistance,
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime,
        departuretime

    })

    newtrip.save().then(()=>{

        res.json("Trip Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

        trip.find().then((trip)=>{

            res.json(trip)

        }).catch((err)=>{
            console.log(err)
        })

})

router.route("/update/:id").put(async(req,res)=>{

    let tripid = req.params.id;
    const {tripname,
        tripduration,
        tripdistance,
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime,
        departuretime} = req.body; 

    const updatetrip = {
        tripname,
        tripduration,
        tripdistance,
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime,
        departuretime
    }

    const update = await trip.findByIdAndUpdate(tripid,updatetrip).then(()=>{

        res.status(200).send({status:"Trip Updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{

    let tripid =  req.params.id;

    await trip.findByIdAndDelete(tripid).then(()=>{
        res.status(200).send({status:"Trip Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let tripid = req.params.id;
    const user = await trip.findById(tripid).then((trip)=>{
        res.status(200).send({status:"Trip Fetched",trip})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message})
    })
})

module.exports = router;