const express = require('express');
const blogs = require('../routes/blogs');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));
    app.use('/api/blogs', blogs);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
};