const express = require('express');
const auth = require('../../middleware/Authentication');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// Use the Express router
const Router = express.Router();

// Get profile information using router
Router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user." });
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route GET API/profile
// @desc Create or Update user profile
// @access Private

Router.post('/', [auth, [
    check('profession', 'Enter in your profession.')
        .not()
        .isEmpty(),
    check('skills', 'Insert at least one skill you have.')
        .not()
        .isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            user,
            portfolio,
            company,
            location,
            profession,
            skills,
            bio,
            experience,
            education,
            linkedin,
            github,
            twitter,
            instagram
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (portfolio) profileFields.portfolio = portfolio;
        if (company) profileFields.company = company;
        if (location) profileFields.location = location;
        if (profession) profileFields.profession = profession;
        if (bio) profileFields.bio = bio;
        if (skills) {
            // Split skills into an array, then remove spaces from user entries
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Construct social object
        profileFields.social = {};
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (github) profileFields.social.github = github;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                // Update profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }
            // Create profile
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error.")
        }
    });


module.exports = Router;