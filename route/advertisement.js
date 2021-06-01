const express = require('express');
const router = express.Router();

const controller = require('../controller/advertisement');
const validatorErr = require('../middleware/validatorErr');
const validator = require('../middleware/validator');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');

router.post('/add', /*verifyToken,*/ upload.advertisement_video.single('advertisement_video'), validator.advertisement_add, validatorErr, controller.advertisement_add);
router.post('/get', verifyToken,  controller.advertisement_get);
router.post('/coin', verifyToken,  controller.advertisement_get);

module.exports = router;
