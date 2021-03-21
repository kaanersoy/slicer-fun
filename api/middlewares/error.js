const config = require('../../config/index');

module.exports = (error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        stack: config.env == 'production' ? '❤' : error.stack
    });
}
