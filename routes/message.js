const express = require('express');
const router = express.Router();
const {Message, validateMessage} = require('../models/message');
const limiter = require('../middleware/limit');

router.post('/', limiter, async (req, res) => {
    const {error} = validateMessage(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const message = new Message({
        message: req.body.message,
    });

    const result = await message.save();
    res.send(result);
});

module.exports = router;