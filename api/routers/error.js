const express = require('express');
const router = express.Router();
const errorController = require('../controllers/error');

router.get('/404', errorController.getNotFound);

module.exports = router;
