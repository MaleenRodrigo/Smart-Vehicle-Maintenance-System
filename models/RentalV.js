const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RentalOSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "customers",
    },
    vehicle_category : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    vehicle_name : {
        type : String,
        required : true
    },
    numberplate : {
        type : String,
        required : true
    },
    vehicle_mileage_s : {
        type : Number,
        required : true
    },
    vehicle_mileage_f : {
        type : Number,
        required : true
    },
    passengers_No: {
        type : Number,
        required : true
    },
    condition: {
        type : String,
        required : true
    },
    timePeriod: {
        type : Date,
        required: true
    },
    additional_details: {
        type : String,
        
    },
    rental_price: {
        type : Number,
        required: true
    },
    vehicle_returning : {
        type : Date,
        required : true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
    },

});

module.exports = RentalO = mongoose.model("rentalo", RentalOSchema);