const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fuelEntrySchema = new Schema({
    
    vehicle_id : {
        type : String,
        required : true
    },

    fuel_date : {
        type : Date,
        required : true
    },

    fuel_type : {
        type : String,
        required : true
    },

    fuel_quantity : {
        type : number,
        required : true
    },

    fuel_cost : {
        type : number,
        required : true
    },

    vehicle_milage : {
        type : number,
        required : true
    }
})

const FuelEntry = mongoose.model("FuelEntry", fuelEntrySchema);

module.exports = FuelEntry;