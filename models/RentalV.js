const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({

    vehiclecategory : {
        type : String,
        required : true
    },
    vehiclemodel : {
        type : String,
        required : true
    },
    numberplate : {
        type : String,
        required : true
    },
    
    passengersno: {
        type : Number,
        required : true
    },
    condition: {
        type : String,
        required : true
    },
    distance: {
        type : String,
        required: true
    },
    additionaldetails: {
        type : String,
        
    },
    
    
});

module.exports = Rental = mongoose.model("rental", RentalSchema);




