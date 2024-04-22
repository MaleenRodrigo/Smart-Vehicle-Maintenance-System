const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleOwner",
  },

  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  userlicense: [
    {
      licensenumber: {
        type: String,
        required: true,
      },
      expirydate: {
        type: Date,
        required: true,
      },
      issueddate: {
        type: Date,
        required: true,
      },
    },
  ],

  vehicleinsurance: [
    {
      insurancenumber: {
        type: String,
        required: true,
      },
      insurancetype: {
        type: String,
        required: true,
      },
      expirydate: {
        type: Date,
        required: true,
      },
      issueddate: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
