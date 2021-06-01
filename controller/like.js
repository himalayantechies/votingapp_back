const db = require('../db')

module.exports = {
    like_add_delete: async (req, res) => {
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let like = await db.models.model_like.findOne({$and: [{customer_id: req.customer_id}, {model_nepal_id: req.params.id}]})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(like){
            await db.models.model_like.deleteOne({_id: like._id})
                .catch(err => {
                    return res.status(500).json({err: 'Please try again later'})
                })
            return res.status(200).json({message: 'Like is deleted'})
        }
        let new_like = new db.models.model_like({
            customer_id: req.customer_id,
            model_nepal_id: req.params.id,
        })
        new_like.save()
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        res.status(200).json({message: 'Like is created'})
    },

    like_model_customer: async (req, res) => {
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let model = await db.models.model_like.aggregate([
            { $match: {customer_id: req.customer_id}},
            { $lookup: { from: "model_nepals", localField: "model_nepal_id", foreignField: "_id", as: "model"  } },
        ])
        console.log(model);
        res.status(200).json({model: model})
    }
}
