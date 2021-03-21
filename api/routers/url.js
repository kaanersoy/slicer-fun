const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url');

router.get('/:id', urlController.getUrlById);
router.post('/url', urlController.createUrl);

module.exports = router;
