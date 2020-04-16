const express = require('express');
require('express-async-errors');
const logger = require('./startup/logger');
const app = express();


require('./startup/routes')(app);
require('./startup/database')();
require('./startup/logging')();
require('./startup/config')();

const port = process.env.PORT || 4000; //get PORT from platform
app.listen(port, () => {logger.info(`Listening on port ${port}`)});