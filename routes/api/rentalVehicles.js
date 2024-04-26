const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Rental = require('../../models/RentalV');

// @route   POST api/RentalV/add
// @desc    Add a new RentalV
// @access  Public
router.post("/add", [
      check("vehiclecategory", "vehiclecategory is required!").not().isEmpty(),
      check("vehiclemodel", "vehiclename is required!").not().isEmpty(),
      check("numberplate", "numberplate is required!").not().isEmpty(),
  
      check("passengersno", "passengersno is required!").not().isEmpty(),
      check("condition", "condition is required!").not().isEmpty(),
      check("distance", "distance Type is required!").not().isEmpty(),
      check("additionaldetails", "additionaldetails Type is required!").not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vehiclecategory, vehiclemodel, numberplate, passengersno, condition, distance, additionaldetails} = req.body;

    const newRentalVehicles = new Rental({
      vehiclecategory,
      vehiclemodel,
      numberplate,
      passengersno,
      condition,
      distance,
      additionaldetails
    });

    await newRentalVehicles.save();
    res.json({ message: "Rental Vehicle added successfully", RentalV: newRentalVehicles });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//retrieving data
// @route   GET api/RentalV
// @desc    Get all RentalV
// @access  Public
router.get("/", async (req, res) => {
  try {
    const RentalV = await Rental.find();
    res.json(RentalV);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/RentalV/update/:id
// @desc    Update a RentalV by ID
// @access  Public
router.put("/update/:id", async (req, res) => {
  try {
    const { vehiclecategory, vehiclemodel, numberplate, passengersno, condition, distance, additionaldetails} = req.body;
    const rentalId = req.params.id;

    const updatedRentalV = {
      vehiclecategory,
      vehiclemodel,
      numberplate,
      passengersno,
      condition,
      distance,
      additionaldetails
    };

    const RentalV = await Rental.findByIdAndUpdate(rentalId, updatedRentalV, { new: true });

    if (!Rental) {
      return res.status(404).json({ message: "RentalV not found" });
    }

    res.json({ message: "RentalV updated successfully", RentalV });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/RentalVs/delete/:id
// @desc    Delete a RentalV by ID
// @access  Public
router.delete("/delete/:id", async (req, res) => {
  try {
    const rentalId = req.params.id;
    const deletedRental = await Rental.findByIdAndDelete(rentalId);

    if (!deletedRental) {
      return res.status(404).json({ message: "Rental vehi not found" });
    }

    res.json({ message: "Rental vehi deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;