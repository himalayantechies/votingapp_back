const {validationResult} = require('express-validator');
const rimraf = require("rimraf");
const db = require('../db');


let validator_err = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if(req.files.length){
          await  rimraf.sync(`uploads/model/${req.model_id}`);
        }
        if(req.model_id){
           await db.models.model_nepal.deleteOne({_id: req.model_id })
        }
        return res.status(400).json({message: errors.array()[0].msg});
    }else {
        next()
    }
}

module.exports = validator_err;
