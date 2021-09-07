const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Gravatar = require('gravatar');
const BCrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('config');

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
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // See if user exists via query
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists. Choose another username." }] });
            }
            // Get user's avatar based on their email
            const avatar = Gravatar.url(email, {
                s: '200',
                r: 'pg', // No NSFW pictures
                d: 'mm' // Default profile picture always set
            })

            user = new User({
                name, email, avatar, password
            });

            // Encrypt password via BCrypt
            const Salt = await BCrypt.genSalt(12);

            user.password = await BCrypt.hash(password, Salt);

            // Save user to database
            await user.save();

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