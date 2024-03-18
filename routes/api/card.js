const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
// const { check, validationResult } = require ('express-validator/check')
const CardModle = require("../../models/Card");

// @route POST api/card
// Route to create a new card
router.post("/", async (req, res) => {
    try {
      const { nameOnCard, cardNumber, expiration, ccv } = req.body;
  
      // Create a new card object
      const newCard = new Card({
        nameOnCard,
        cardNumber,
        expiration,
        ccv,
      });
  
      // Save the card to the database
      await newCard.save();
  
      res.status(201).json({ message: "Card created successfully", card: newCard });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  
  
  module.exports = router;