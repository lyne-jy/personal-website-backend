const mongoose = require('mongoose');
const Joi = require('joi');
const {commentSchema} = require('./comment');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(+ new Date() + 8 * 3600 * 1000).toJSON()
    },
    genre: {
        type: String,
        required: true,
        enum: ["coding", "music", "photography", "life"]
    },
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "A blog should have at least one tag."
        }
    },
    content: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: [commentSchema]
});

const Blog = mongoose.model('Blog', blogSchema);

function validateBlog(blog) {
    const schema = {
        title: Joi.string().required().max(30),
        date: Joi.string(),
        genre: Joi.string().required().max(20),
        tags: Joi.array().items(Joi.string().max(20)).required().max(3),
        content: Joi.string().required(),
        body: Joi.string().required()
    };
    const result = Joi.validate(blog, schema);
    return result;
}

module.exports.Blog = Blog;
module.exports.validateBlog = validateBlog;