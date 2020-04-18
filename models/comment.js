const mongoose = require('mongoose');
const Joi = require('joi');

const commentSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now() + 8 * 60 * 60 * 1000
    }
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(comment) {
    const schema = {
        username: Joi.string().required(),
        content: Joi.string().max(255).required(),
        date: Joi.string().required()
    };

    const result = Joi.validate(comment, schema);
    return result;
}

module.exports.validateComment = validateComment;
module.exports.Comment = Comment;
module.exports.commentSchema = commentSchema;