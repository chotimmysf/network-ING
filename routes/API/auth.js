const express = require('express');
const Auth = require('../../middleware/Authentication');
const User = require('../../models/User');
const BCrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const JWT = require('jsonwebtoken');
const config = require('config');

// Use the Express router
const Router = express.Router();

// @route GET API/auth
// @desc Test route
// @access Public
Router.get('/', Auth, async (req, res) => {
    // Call to database, find user by their ID
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route GET API/auth
// @desc Authenticate user & get token
// @access Public
Router.post('/', [
    check('email', 'Enter a valid email.').isEmail(),
    check('password', 'Enter a password.').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        // If there are errors, show statuses
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials." }] });
            }

            // Take the plain text password and the encrypted password & see if they match.
            const IsMatch = await BCrypt.compare(password, user.password);

            if (!IsMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Passwords do not match.' }] });
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            JWT.sign(payload, config.get('JWT_Token'),
                { expiresIn: 999999 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error.');
        }
    });

module.exports = Router;

module.exports = Router;