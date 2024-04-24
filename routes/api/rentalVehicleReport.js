const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); // Assuming auth middleware for authentication
const { check, validationResult } = require("express-validator");

const RentalV = require("../../models/RentalV");

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

router.get("/VehicleTypeCount", auth, async (req, res) => {
  try {
    const vehicleTypes = await getVehicleTypeCount();
    res.json(vehicleTypes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export const BarChartData = {
  // const VehicleTypesX = Object.keys(vehicleTypes);  // ["car", "van", "bus"]
  // const NoOfVehiclesY = Object.values(vehicleTypes);  // [10, 20, 30]

  labels: Object.keys(vehicleTypes), // ["car", "van", "bus"]
  datasets: [
    {
      label: "Number of Vehicles",
      data: Object.values(vehicleTypes), // [10, 20, 30]
      backgroundColor: "grey",
      borderColor: "blue",
      corderWidth: 1,
    },
  ],
};
module.exports = router;
