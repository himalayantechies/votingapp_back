const express = require('express');
const router = express.Router();

const controller = require('../controller/forgotPass');
const validatorErr = require('../middleware/validatorErr');
const validator = require('../middleware/validator');

router.post('/send/email', validator.forgot_email, validatorErr, controller.send_email);
router.post('/send/code', validator.forgot_code, validatorErr, controller.send_code);
router.post('/change/password', validator.forgot_password, validatorErr, controller.change_password);

module.exports = router;
