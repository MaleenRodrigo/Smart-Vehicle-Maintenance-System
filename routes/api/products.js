const express = require('express');
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const Product = require("../../models/product");

// @route GET api/products
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Products route'));

module.exports = router;