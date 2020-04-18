const express = require('express');
const router = express.Router();
const {Blog, validateBlog} = require('../models/blog');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({date: -1});
    res.send(blogs);
    // setTimeout(() => {res.send(blogs)}, 300)
});

router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("Not Found");

    const nextBlog = await Blog.findOne({date: {$lt: blog.date}}).sort({date: -1}).select('title _id');
    const lastBlog = await Blog.findOne({date: {$gt: blog.date}}).sort({date: 1}).select('title _id');
    blog._doc.lastBlog = lastBlog;
    blog._doc.nextBlog = nextBlog;

    res.send(blog);
    // setTimeout(() => {res.send(blog)}, 300)
});

router.post('/', [auth, admin], async (req, res) => {
    const {error} = validateBlog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const blog = new Blog({
        title: req.body.title,
        date: req.body.date,
        genre: req.body.genre,
        tags: req.body.tags,
        content: req.body.content,
        body: req.body.body,
        comments: []
    });

    const result = await blog.save();
    res.send(result);
});

router.put('/:id', [auth, admin], async (req, res) => {
    const {error} = validateBlog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const result = await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        date: req.body.date,
        genre: req.body.genre,
        tags: req.body.tags,
        content: req.body.content,
        body: req.body.body
    }, {new: true});
    if (!result) return res.status(404).send("Not Found");
    res.send(result);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const result = await Blog.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("Not Found");
    res.send(result)
});

module.exports = router;