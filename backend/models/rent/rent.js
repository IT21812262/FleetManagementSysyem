const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentSchema = new Schema({

    vehicle_no : {
        type : String,
        required: true
    },
    milage : {
        type: Number,
        required: true
    },
    capacity : {
        type: String,
        required: true
    },
    borrow_date : {
        type: Date,
        required: true
    },
    owner_details : {
        type: String,
        required: true
    }

})

const RentVehicle = mongoose.model("RentVehicle",rentSchema);

module.exports = RentVehicle;