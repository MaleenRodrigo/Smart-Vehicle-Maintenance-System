const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

// @route POST api/auth
// @desc Authenticate customer & get token (login)
// @access Public
router.post(
  "/",
  [
    check("email", "Please include valid email!").isEmail(),
    check("password", "Password is required!").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if customer exists
      let customer = await Customer.findOne({ email });

      if (!customer) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials!" }] });
      }

      // Check the password that matches with exact password
      const isMatch = await bcrypt.compare(password, customer.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Password doesn't match!" }] });
      }

      // Return jsonwebtoken
      const payload = {
        customer: {
          id: customer.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error!");
    }
  }
);

module.exports = router;
