const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); // Assuming auth middleware for authentication
const { check, validationResult } = require("express-validator");

const vehicleModel = require("../../models/RentalV");

async function getVehicleTypeCount() {
  try {
    const vehicles = await RentalV.find();
    const vehicleTypes = {};

    for (const vehicle of vehicles) {
      const type = vehicle.vehiclecategory;
      vehicleTypes[type] = (vehicleTypes[type] || 0) + 1;
    }

    return vehicleTypes;
  } catch (err) {
    console.error(err);
    return null;
  }
}

app.get("/vehicle-type-count", async (req, res) => {
  const vehicleTypes = await getVehicleTypeCount();
  if (vehicleTypes) {
    res.json(vehicleTypes);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
