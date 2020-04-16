const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('config');

module.exports = function () {
    const url = config.get("db");
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(logger.info("Connected to MongoDB"));
};