const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentSchema = new Schema({

    vehicle_no : {
        type : String,
        required: true
    },
    brand : {
        type : String,
        required: true
    },
    vehicle_model : {
        type :String,
        required :true
    },
    milage : {
        type: Number,
        required: true
    },
    capacity : {
        type: String,
        required: false
    },
    description : {
        type: String,
        required: true
    },
    borrow_date : {
        type: Date,
        required: true
    },
    dropoff_date: {
        type: Date,
        required: false
    },
    owner_name : {
        type: String,
        required: true
    },
    owner_phone : {
        type: Number,
        required: true
    },
    owner_email : {
        type: String,
        required: true
    },
    cost_per_month_in_Rs : {
        type : Number,
        required : false
    }

})

const RentVehicle = mongoose.model("RentVehicle",rentSchema);

module.exports = RentVehicle;