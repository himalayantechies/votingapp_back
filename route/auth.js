const express = require('express');
const router = express.Router();

const controller = require('../controller/auth');
const validatorErr = require('../middleware/validatorErr');
const validator = require('../middleware/validator');
const verifyToken = require('../middleware/verifyToken');

router.post('/signin', validator.signin, validatorErr, controller.signin);
router.post('/signup', validator.signup, validatorErr, controller.signup);

router.get('/me', verifyToken, controller.me);

module.exports = router;
