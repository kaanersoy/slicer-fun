const config = require('../../config/index');

module.exports = (error, req, res, next) => {
    res.status(error.status || 400).json({
        message: error.message,
        stack: config.env == 'production' ? '❤' : error.stack
    });
}
