const mongoose = require("mongoose");

const serviceCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  services: [
    {
      servicename: {
        type: String,
      },
      serviceprice: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      
    },
  ],
  
});

module.exports = ServiceCenter = mongoose.model("servicecenter",serviceCenterSchema);
