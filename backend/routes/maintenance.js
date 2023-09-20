const router = require("express").Router();
let correctiveMaintence = require("../models/maintenance/maintenance");

//add date to database
router.route("/add").post((req,res)=>{

    const DID = req.body.DID;
    const vehicleNo = req.body.vehicleNo;
    const Date_report = Date(req.body.Date_report);
    const priority = req.body.priority;
    const description = req.body.description;
    const parts_used = req.body.parts_used;
    const Date_complete = Date(req.body.Date_complete);

    const newcorrectiveMaintence = new correctiveMaintence({
    
        DID,
        vehicleNo,
        Date_report,
        priority,
        description,
        parts_used,
        Date_complete
    })

    newcorrectiveMaintence.save().then(()=>{
        res.json("New Corrective Maintence Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//get data from database
router.route("/display").get((req,res)=>{

    correctiveMaintence.find().then((correctiveMaintences)=>{
        res.json(correctiveMaintences)
    }).catch((err)=>{
        console.log(err)
    })
})

//Update data in the database
router.route("/update/:correctiveJobid").put(async(req,res)=>{
    let id = req.params.correctiveJobid;
    const {priority, description, parts_used} = req.body;

    const updatecorrectiveMaintence = {
        priority,
        description,
        parts_used
    }

    const update = await correctiveMaintence.findByIdAndUpdate(id,updatecorrectiveMaintence).then(()=>{
        res.status(200).send({status : "Job Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message})
    })

})

//delete Job
router.route("/delete/:id").delete(async(req,res)=>{
    let id = req.params.id;

    await correctiveMaintence.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status:"Job deleted"});
    }).catch((err)=>{
        console.log(ree.message);
        res.status(500).send({status : "Error with delete job"})
    })
})

//Finding Unique job
router.route("/get/:id").get(async(req,res) =>{
    let jobId = req.params.id;

    const CorrectiveJob = await correctiveMaintence.findByIdAndDelete(jobId) 
    
    .then(() =>{
        res.status(200).send({status :"Job Data Successfully Fetched!!!!!!", supplier});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Not Fetched. Error in the job data Fetched!!!!", error: err.message});
    })
})


module.exports = router;

