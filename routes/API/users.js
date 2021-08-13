const express = require('express');

// Use the Express router
const Router = express.Router();

// @route GET API/users
// @desc Test route
// @access Public
Router.get('/', (req, res) => res.send('User route'));

module.exports = Router;