const express = require('express');
const nocache = require('nocache');
const router = express.Router();

const users = require('./controllers/users');
const books = require('./controllers/books');
const logger = require('./middleware/logger');

router.use(logger);
router.use(nocache());
router.use('/users',users)
router.use('/books',books)

module.exports = router;