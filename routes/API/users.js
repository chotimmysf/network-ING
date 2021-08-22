const express = require('express');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// Use the Express router
const Router = express.Router();

// @route GET API/users
// @desc Register user
// @access Public
Router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Enter a valid email.').isEmail(),
    check('password', 'Enter a password between 8 and 32 characters.').isLength({ min: 8, max: 32 })
],
    async (req, res) => {
        const errors = validationResult(req);
        // If there are errors, show statuses
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: error.Router.array() });
        }

        const { name, email, password } = req.body;

        try {
            // See if user exists via query
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({ errors: [{ msg: "User already exists. Choose another username." }] });
            }
            // Get user's avatar based on their email

            // Encrypt password via BCrypt

            // Return jsonwebtoken
            res.send('User route');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error.');
        }
    });

module.exports = Router;