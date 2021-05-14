const db = require('../db');
async function createModel(req, res, next) {
    let model_create = new db.models.model_nepal()
    let model = await model_create.save()
    req.model_id = model._id;
    next();
}

module.exports = createModel;
