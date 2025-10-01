const express = require('express');
const router = express.Router();
const { saveAPIKey, getLists } = require('../controllers/espController');

router.post('/', saveAPIKey);         
router.get('/lists', getLists);       

module.exports = router;
