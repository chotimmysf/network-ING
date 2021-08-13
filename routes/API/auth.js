const express = require('express');

// Use the Express router
const Router = express.Router();

// @route GET API/auth
// @desc Test route
// @access Public
Router.get('/', (req, res) => res.send('Authentication route'));

module.exports = Router;