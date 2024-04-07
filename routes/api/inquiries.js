const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Models
const Customer = require("../../models/Customer");
const Inquiry = require("../../models/Inquiry");

// @route POST api/inquiries
// @desc Create an inquiry
// @access Public
router.post("/", [
  auth,
  [
    check("phone", "Phone is required!").not().isEmpty(),
    check("title", "Title is required!").not().isEmpty(),
    check("description", "Description is required!").not().isEmpty(),
    check("inquiryType", "Inquiry Type is required!").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Getting the user who creates the inquiry
      const customer = await Customer.findById(req.customer.id).select("-password");

      // Creating an new inquiry
      const newInquiry = new Inquiry({
        email: customer.email,
        phone: req.body.phone,
        title: req.body.title,
        description: req.body.description,
        inquiryType: req.body.inquiryType,
        status: "Pending",
      });

      // Save the inquiry in DB and set that inquiry in variable
      const inquiry = await newInquiry.save();

      // Get the saved inquiry as response
      res.json(inquiry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },
]);

// @route GET api/inquiries
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send("Inquiries route success"));

module.exports = router;
