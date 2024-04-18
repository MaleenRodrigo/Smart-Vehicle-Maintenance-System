const express = require("express");
const router = express.Router();



const Customer = require("../../models/Customer");

const RentalV = require("../../models/RentalV");

router.post("/", [
  auth,
  [
    check("location", "location is required!").not().isEmpty(),
    check("vehicle_category", "vehicle_category is required!").not().isEmpty(),
    check("vehicle_name", "vehicle_name is required!").not().isEmpty(),
    check("numberplate", "numberplate is required!").not().isEmpty(),
    check("vehicle_mileage_s", "vehicle_mileage_s is required!").not().isEmpty(),
    check("vehicle_mileage_f", "vehicle_mileage_f is required!").not().isEmpty(),
    check("passengers_No", "passengers_No is required!").not().isEmpty(),
    check("condition", "condition is required!").not().isEmpty(),
    check("timePeriod", "timePeriod Type is required!").not().isEmpty(),
    check("rental_price", "timePeriod Type is required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Getting the rental vehicle details.........
      const customer = await Customer.findById(req.customer.id).select(
        "-password"
      );

      //create a new rental vehicle
      const newRentalVehicles = new RentalV({
        name: Customer.name,
        phone: Customer.phone,
        email: Customer.email,

        location: req.body.location,
        vehicle_category: req.body.vehicle_category,
        vehicle_name: req.body.vehicle_name,
        numberplate: req.body.numberplate,
        vehicle_mileage_s: req.body.vehicle_mileage_s,
        vehicle_mileage_f: req.body.vehicle_mileage_f,
        passengers_No: req.body.passengers_No,
        condition: req.body.condition,
        timePeriod: req.body.timePeriod,
        rental_price: req.body.rental_price,
        additional_details: req.body.timePeriod,
        date: req.body.date,
      });

      // Save the rental vehicle in DB and set that rental vehicle in a variable
      const rentalVehi = await newRentalVehicles.save();

      // Get the saved rented vehicle as response
      res.json(rentalVehi);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },
]);

// @route   GET api/rentalVehicles
// @desc    Get all rentalVehicles
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const rentalVehicles = await RentalV.find().sort({ date: -1 });
    res.json(rentalVehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route   GET api/rentalVehicles/:id
// @desc    Get rentalVehi by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const rentalVehi = await RentalV.findById(req.params.id);

    if (!rentalVehi) {
      return res.status(400).json({ msg: "rental Vehicle Not Found!" });
    }

    res.json(rentalVehi);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "rental Vehicle Not Found!" });
    }
    res.status(500).send("Server Error!");
  }
});

// @route PUT api/rentalVehicles/:id
// @desc Update an rentalVehi
// @access Private
router.put("/:id", [
  auth,
  [
    check("location", "location is required!").not().isEmpty(),
    check("vehicle_category", "vehicle_category is required!").not().isEmpty(),
    check("vehicle_name", "vehicle_name is required!").not().isEmpty(),
    check("numberplate", "numberplate is required!").not().isEmpty(),
    check("vehicle_mileage_s", "vehicle_mileage_s is required!").not().isEmpty(),
    check("vehicle_mileage_f", "vehicle_mileage_f is required!").not().isEmpty(),
    check("passengers_No", "passengers_No is required!").not().isEmpty(),
    check("condition", "condition is required!").not().isEmpty(),
    check("timePeriod", "timePeriod Type is required!").not().isEmpty(),
    check("rental_price", "timePeriod Type is required!").not().isEmpty(),
    check("status", "Status is required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    try {
      const rentalVehi = await RentalV.findByIdAndUpdate(id, req.body);

      if (!rentalVehi) {
        return res.status(400).json({ msg: "rental vehicle is Not Found!" });
      }

      // Getting the user who updates the inquiry ???
      const customer = await Customer.findById(req.customer.id).select(
        "-password"
      );

      const updatedRentalV = await RentalV.findById(id);

      // Get the updated rental vehicle as response
      res.json(updatedRentalV);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },
]);



//delete rental vehicles

router.delete("/:id", auth, async (req, res) => {
  try {
    const rentalVehi = await RentalV.findById(req.params.id);

    // If inquiry not found
    if (!rentalVehi) {
      return res.status(400).json({ msg: "rental Vehicle Not Found!" });
    }

    await rentalVehi.deleteOne();

    res.json({ msg: "rental Vehicle Removed!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "rental Vehicle Not Found!" });
    }
    res.status(500).send("Server Error!");
  }
});