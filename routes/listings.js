const express = require('express');
const router = express.Router();
const listilngsCTRL = require('../controllers/listings')

router.get('/', listilngsCTRL.index);
router.get('/newlist',listilngsCTRL.newListing);
router.get('/:id', listilngsCTRL.show);
router.get('/:id/edit', listilngsCTRL.edit);
router.delete('/:id',listilngsCTRL.remove)



module.exports = router;