const router = require("express").Router();
let trip = require("../models/trip/trip");

router.route("/add").post((req,res)=>{

    const tripid = req.body.tripid;
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
    const startfuel = Number(req.body.startfuel);
    const endfuel = Number(req.body.endfuel);

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
        departuretime,
        startfuel,
        endfuel

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

    let tripId = req.params.id;
    const {tripid,
        tripname,
        tripduration,
        tripdistance,
        vehicleno,
        driverid,
        startpoint,
        destination,
        tripgoods,
        arrivaltime,
        departuretime,
        startfuel,
        endfuel} = req.body; 

    const updatetrip = {
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
        departuretime,
        startfuel,
        endfuel
    }
    const update = await trip.findOneAndUpdate({_id : tripId}, updatetrip)
    .then(()=>{

        res.status(200).send({status:"Trip Updated"})

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    let tripId = req.params.id;
  
    try {
      const deletedTrip = await trip.findByIdAndDelete(tripId);
      if (!deletedTrip) {
        return res.status(404).send({ status: "Trip not found" });
      }
  
      res.status(200).send({ status: "Trip Deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ status: "Error with deleting trip", error: err.message });
    }
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

router.route("/get/:id").get(async (req, res) => {
    let tid = req.params.id;
    const user = await trip.findById(tid)
      .then((trip) => {
        res.status(200).send({ status: "Employee Fetched", trip });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting user", error: err.message });
      });
  });
module.exports = router;