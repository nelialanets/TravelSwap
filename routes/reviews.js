const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/listings:id/reviews', reviewsCtrl.create);
router.delete('/:id', reviewsCtrl.destroy);

module.exports =router;

