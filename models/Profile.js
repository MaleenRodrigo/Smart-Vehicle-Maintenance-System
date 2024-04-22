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

  vehicle: [
    {
      make: {
        type: String,
        required: true,
      },
      model: {
        type: String,
        required: true,
      },
      year: {
        type: String,
        required: true,
      },
      registrationnumber: {
        type: String,
        required: true,
      },
      fueltype: {
        type: String,
      },
      dailyusage: {
        type: String,
        required: true,
      },
      //Vehicle License

      licensenumber: {
        type: String,
        required: true,
      },
      licenseissued: {
        type: Date,
        required: true,
      },
      licenseexpiry: {
        type: Date,
        required: true,
      },

      //Vehicle Insurance

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
