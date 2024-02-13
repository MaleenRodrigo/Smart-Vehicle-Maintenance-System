const express = require('express');
const router = express.Router();

// @route GET api/inquiries
// @desc Test route
// @access Public
router.get('/', (req, res) => res.send('Inquiries route'));

module.exports = router;