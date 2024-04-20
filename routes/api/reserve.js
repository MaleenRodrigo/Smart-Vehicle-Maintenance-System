const express = require("express");
const router = express.Router();
const checkObjectId = require("../middleware/checkObjectId");
const Reservation = require("../models/reservation"); // Capitalized Reservation to match the export

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", async (req, res) => {
  const { ownername, vehiclenum, services, servicedate } = req.body;
  try {
    const reserve = new Reservation({ // Capitalized Reservation to match the model
      ownername,
      vehiclenum,
      services,
      servicedate,
    });

    await reserve.save();
    return res.json(reserve);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    GET api/users/user/:res_id
// @desc     Get reservation by ID
// @access   Public
router.get("/:res_id", checkObjectId("res_id"), async (req, res) => {
  try {
    const reservation = await Reservation
      .findById(req.params.res_id) // Changed to findById to find by _id
      .populate(["ownername", "vehiclenum"]); // Populate fields directly from the reservation document

    if (!reservation)
      return res.status(400).json({ msg: "Reservation not found" });

    return res.json(reservation);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
