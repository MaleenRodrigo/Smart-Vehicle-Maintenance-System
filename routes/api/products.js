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
[
    check("name", "Product name is required!").not().isEmpty(),
    check("brand", "Product brand is required!").not().isEmpty(),
    check("model","Product model is required!").not().isEmpty(),
    check("description","Product description is required!").not().isEmpty(),
    check("price","Product price is required!").not().isEmpty(),
]
module.exports = router;