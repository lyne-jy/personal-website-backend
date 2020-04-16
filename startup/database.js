const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function () {
    mongoose.connect('mongodb://localhost/lyne', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(logger.info("Connected to MongoDB"));
};