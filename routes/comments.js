const express = require('express');
const router = express.Router();
const {Comment, validateComment} = require('../models/comment');
const {Blog} = require('../models/blog');
const limiter = require('../middleware/limit');

router.post('/:id', async (req, res) => {
    const {error} = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const blog = await Blog.findById(req.params.id);
    const comment = new Comment({
        username: req.body.username,
        content: req.body.content,
        // date: req.body.date
    });
    blog.comments.push(comment);

    await blog.save();
    res.send(blog.comments);
});

module.exports = router;