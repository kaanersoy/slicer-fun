const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
    app.use(morgan('tiny'));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(cors());
    app.use(express.json());
    app.use(express.static('public'));
}
