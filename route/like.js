const express = require('express');
const router = express.Router();

const controller = require('../controller/like');
const VerifyToken = require('../middleware/verifyToken')

router.get('/add/delete/:id', VerifyToken, controller.like_add_delete);
router.get('/model/customer', VerifyToken, controller.like_model_customer);

module.exports = router;
