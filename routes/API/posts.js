const express = require('express');
const {check, validationResult} = require('express-validator/check');
const { models } = require('mongoose');
const auth = require('../../middleware/Authentication');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// const User = require('/../../models/User');

// Use the Express router
const Router = express.Router();

// @route GET API/posts
// @desc Create a post
// @access Private
Router.post('/', [
    auth, [
        check('text',"Text is required.").not().isEmpty()
    ]
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    try {
        // Bring in and await for User model
        const user = await User.findById(req.user.id).select('-password')

        const newPost = new Post({
            text: req.body,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }

}
);

// @route GET API/posts
// @desc Get all posts
// @access Private
Router.get('/', auth, async(req, res) => {
    try {
        // Sort posts by newest first
        const posts = await Post.find().sort({date: -1});
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
}
});

// @route DELETE API/posts/:id
// @desc Delete a post
// @access Private
Router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'Post not found.'});
        }

        if (!user) {
            return res.status(404).json({msg: 'User not found.'});
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        await post.remove();

        res.json({msg: 'Post removed successfully.'});
    } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error.');
}
});

// @route PUT API/posts/like/:id
// @desc Like a post
// @access Private
Router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.json(400).json('You already liked this post.');
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// @route GET API/posts/comment/:id
// @desc Comment on a post
// @access Private
Router.post('/comment/:id', [
    auth, [
        check('text',"Text is required.").not().isEmpty()
    ]
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    try {
        // Bring in and await for User model
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        res.json(post.comments);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }

}
);

// @route PUT API/posts/comment/:id/:comment_id
// @desc Remove a comment
// @access Private
Router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Post comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        // Ensure comment exists
        if(!comment) {
            return res.status(404).json({msg: 'Comment does not exist.'});
        }

        // Check if OP is initiating the deletion
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'You cannot delete the comment since you did not write it.'});
        }

        // Get remove index
        const removeIndex = post.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = Router;