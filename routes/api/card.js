const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CardModle = require("../../models/Card");
const Card = require("../../models/Card");

// @route POST api/card
// Route to create a new card
router.post("/", async (req, res) => {
  try {
    const { cardNumber, nameOnCard, month, year, ccv } = req.body;

    // Construct expiration string in the format "MM/YY"
    const expiration = `${month.toString().padStart(2, "0")}/${year
      .toString()
      .slice(-2)}`;

    // Mask the credit card number
    const maskedCardNumber = maskCreditCard(cardNumber);

    // Create a new card payment object
    const newCard = new Card({
      cardNumber: maskedCardNumber,
      nameOnCard,
      expiration,
      ccv,
    });

    // Save the card payment details to the database
    await newCard.save();

    res
      .status(201)
      .json({ message: "Card saved successfully!", card: newCard });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "saving Failed!. Please contact support." });
  }
});

// Route to delete a card
router.delete("/:id", async (req, res) => {
  try {
    const cardId = req.params.id;

    // Find the card by ID and delete it
    const deletedCard = await Card.findByIdAndDelete(Id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card deleted successfully", card: deletedCard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Function to mask the credit card number
function maskCreditCard(cardNumber) {
  const visibleDigits = 2; // Number of visible digits at the beginning and end
  const maskedDigits = cardNumber.length - 2 * visibleDigits; // Number of masked digits
  const maskedPart = "*".repeat(maskedDigits); // Create a string of asterisks with the same length as masked digits
  const visiblePart =
    cardNumber.substring(0, visibleDigits) +
    maskedPart +
    cardNumber.substring(cardNumber.length - visibleDigits);
  return visiblePart;
}


module.exports = router;
