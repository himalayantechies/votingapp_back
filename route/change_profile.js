const express = require('express');
const router = express.Router();

const controller = require('../controller/change_profile');
const validator = require('../middleware/validator')
const validatorErr = require('../middleware/validatorErr')
const VerifyToken = require('../middleware/verifyToken')

router.get('/profile', VerifyToken, validator.change_profile, validatorErr, controller.change_profile);
router.get('/password', VerifyToken, validator.change_password, validatorErr, controller.change_password);

module.exports = router;
