const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const preventiveSchema = new Schema({
    DID : {
        type : String,
        required : true 
    },
    vehicleNo : {
        type : String,
        required : true
    },

    Date_report : {
        type :Date,
        required : true
    },

    priority : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    parts_used : {
        type : String,
        required : true
    },

    Date_complete :{
        type : Date,
        required : true
    }

})

const preventiveMaintence = mongoose.model("preventiveMaintence",preventiveSchema);

module.exports = preventiveMaintence;