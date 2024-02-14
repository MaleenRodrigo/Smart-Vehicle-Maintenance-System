const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Customer = require("../../models/Customer");

// @route GET api/auth
// @desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select(
      "-password"
    );
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!!!");
  }
});

module.exports = router;
