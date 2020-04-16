const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const {User} = require('../models/user');

function validate(user) {
    const schema = {
        email: Joi.string().min(1).max(255).required().email(),
        password: Joi.string().min(5).required()
    };

    const result = Joi.validate(user, schema);
    return result;
}

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send("Invalid Email or Password.");

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) res.status(400).send("Invalid Email or Password.");

    const token = user.generateAuthToken();
    res.send(token);
});

module.exports = router;