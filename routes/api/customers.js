const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const Customer = require("../../models/Customer");

// @route POST api/customers
// @desc Register customer
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required!").not().isEmpty(),
    check("email", "Please include valid email!").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters!"
    ).isLength({ min: 6 }),
    check("Please enter your mobile number!").isLength({ max: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    try {
      // Check if customer exists
      let customer = await Customer.findOne({ email });

      if (customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      customer = new Customer({
        name,
        email,
        avatar,
        password,
        phone,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      customer.password = await bcrypt.hash(password, salt);
      await customer.save();

      // Return jsonwebtoken

      res.send("Customer registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error!");
    }
  }
);

module.exports = router;
