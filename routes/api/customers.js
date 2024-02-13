const express = require('express');
const router = express.Router();

// @route GET api/customers
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Customer route'));

module.exports = router;