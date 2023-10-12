const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tripSchema = new Schema({
    
    tripid : {
        type: String,
        required: true
    },

    tripname : {
        type: String,
        required: false
    },

    tripduration :{
        type: Number,
        required: true
    },

    tripdistance: {
        type: Number,
        required: true
    },

    vehicleno: {
        type: Number,
        required: true
    },

    driverid: {
        type: String,
        required: true
    },

    startpoint: {
        type: String,
        required: false
    },

    destination: {
        type: String,
        required: true
    },

    tripgoods: {
        type: String,
        required: true
    },

    arrivaltime: {
        type: Number,
        required: true
    },

    departuretime: {
        type: Number,
        required: true
    },

    startfuel: {
        type:Number,
        required: true
    },

    endfuel:{
        type:Number,
        required: false
    }


})

const trip = mongoose.model("trip", tripSchema)

module.exports = trip;