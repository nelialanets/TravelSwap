const express = require('express');
const router = express.Router();
const listilngsCTRL = require('../controllers/listings')

router.get('/listings/new', listilngsCTRL.index);
router.get('/new',listilngsCTRL.newListing);
router.get('/:id', listilngsCTRL.show);
router.get('/:id/edit', listilngsCTRL.edit);

module.exports = router;