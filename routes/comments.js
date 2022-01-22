const express = require('express');
const router = express.Router();
const  commentCtrl= require('../controllers/comments');

router.put('/listings/:id/comment', commentCtrl.addComment);


module.exports =router;

