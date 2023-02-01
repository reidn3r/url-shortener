const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/getMain'));

router.get('/:id', require('../controllers/getId'));

router.post('/', require('../controllers/postMain'));

module.exports = router;