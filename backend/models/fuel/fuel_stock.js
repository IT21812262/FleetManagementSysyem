const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fuelStockSchema = new Schema({
    
    invoice_no : {
        type : String,
        required : true
    },
    
    stocked_fuel_type : {
        type : String,
        required : true
    },

    stocked_fuel_quantity : {
        type : Number,
        required : true
    },

    per_leter_cost : {
        type : Number,
        required : true
    },

    total_cost : {
        type : Number,
        required : true
    },

    stocked_fuel_date : {
        type : Date,
        required : true
    }

})

const FuelStock = mongoose.model("FuelStock", fuelStockSchema);

module.exports = FuelStock;