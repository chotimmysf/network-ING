const express = require('express');

// Use the Express router
const Router = express.Router();

// @route GET API/posts
// @desc Test route
// @access Public
Router.get('/', (req, res) => res.send('Posts route'));

module.exports = Router;