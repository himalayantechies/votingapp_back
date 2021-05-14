const express = require('express');
const router = express.Router();

const controller = require('../controller/model');
const createModel = require('../middleware/createModel');
const validatorErr = require('../middleware/validatorErr');
const validator = require('../middleware/validator');
const upload = require('../middleware/upload');
const VerifyToken = require('../middleware/verifyToken')

router.post('/create/step/one', createModel,  upload.model_img.array('model_img'),  validator.model_step_one, validatorErr, controller.model);
router.post('/create/step/two', upload.model_video.array('model_video'),  validator.model_step_two, validatorErr, controller.create_model);
router.get('/top/get', VerifyToken, controller.model_top_get);
router.get('/get', VerifyToken, controller.model_get);
router.get('/item/:id', VerifyToken, controller.model_item);

module.exports = router;
