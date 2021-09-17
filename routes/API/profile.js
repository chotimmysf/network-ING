const express = require('express');
const auth = require('../../middleware/Authentication');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');
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

// @route GET API/profile
// @desc Get all profiles
// @access Public
Router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('User', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
})

// @route GET API/profile/user/user_id
// @desc Get profile by user ID
// @access Public
Router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('User', ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: "There is no profile for this user." });
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectID') {
            return res.status(400).json({ msg: "Profile not found." })
        }
        res.status(500).send("Server error.");
    }
})

// @route DELETE API/profile
// @desc Delete profile, user, & posts
// @access Private
Router.delete('/', auth, async (req, res) => {
    try {
        // Remove user's posts
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted successfully.'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
})

// @route PUT API/profile/experience
// @desc Add profile experience
// @access Private
Router.put('/experience', [auth, [
    check('title', 'Enter in a title.').not().isEmpty(),
    check('company', 'Company is required.').not().isEmpty(),
    check('location', 'Location is required.').not().isEmpty(),
    check('from', 'Enter in the date you began employment.').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title, company, location, from, to, current, description
    } = req.body;

    // Create an object with the data the user submits.
    const newExp = {
        title, company, location, from, to, current, description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route DELETE API/profile/experience
// @desc Delete an experience from a profile
// @access Private
Router.delete('/experience/:exp:id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }
});

// @route PUT API/profile/education
// @desc Add education completed to a profile
// @access Private
Router.put('/education', [auth, [
    check('school', 'School is required.').not().isEmpty(),
    check('degree', 'Degree is required.').not().isEmpty(),
    check('discipline', 'Your discipline, or major or course topic, is required.').not().isEmpty(),
    check('from', 'Enter in the date you began your education.').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school, degree, discipline, from, to, current, description
    } = req.body;

    // Create an object with the data the user submits.
    const newEdu = {
        school, degree, discipline, from, to, current, description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        
        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route DELETE API/profile/education/:edu:id
// @desc Delete an education from a profile
// @access Private
Router.delete('/education/:edu:id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }
});

// @route GET API/profile/github/:username
// @desc Get user repos from GitHub
// @access Public
Router.get('/github/:username', (req,res) => {
    try {
        const options = {
            uri: `https://github.com/users/${req.params.username}/repos?per_page=6&
            sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };

        // Make a request
        request(options, (error, response, body) => {
            if(error) console.error(error);
            if(response.statusCode != 200) {
                res.status(404).json({ msg: "No GitHub profile was found."});
            }

            res.json(JSON.parse(body));
        });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }
})

module.exports = Router;