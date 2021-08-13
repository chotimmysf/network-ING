const express = require('express');

// Use the Express router
const Router = express.Router();

// @route GET API/profile
// @desc Test route
// @access Public
Router.get('/', (req, res) => res.send('Profile route'));

module.exports = Router;