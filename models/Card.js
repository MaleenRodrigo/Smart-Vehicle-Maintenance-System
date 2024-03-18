const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  nameOnCard: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{16}$/.test(v); // Validates that card number is 16 digits
      },
      message: (props) => `${props.value} is not a valid 16-digit card number!`,
    },
  },
  expiration: {
    type: Date,
    default:Date.now,
    required: true,
  },
  ccv: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
  },
});

module.exports = Card = mongoose.model('card',CardSchema);
