const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: true
    },
    email: {
        type: String,
        maxlength: 255,
        minlength: 1,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = {
        username: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(1).max(255).required().email(),
        password: Joi.string().min(5).required()
    };

    const result = Joi.validate(user, schema);
    return result;
}

module.exports.validateUser = validateUser;
module.exports.User = User;