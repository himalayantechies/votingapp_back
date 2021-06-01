const rimraf = require("rimraf");

const db = require('../db')

module.exports = {
    model: async (req, res) => {
        const {
            full_name,
            email,
            country,
            city,
            hight,
            weight,
            age,
            self_introduction,
            hobby_strength,
            experiences,
            votes,
        } = req.body;
        let model_update = await db.models.model_nepal.updateOne({_id: req.model_id}, {
            full_name,
            email,
            country,
            city,
            hight,
            weight,
            age,
            self_introduction,
            hobby_strength,
            experiences,
            votes,
            front_img: req.files[0].path,
            draft: true
        })
            .catch(async err => {
                await db.models.model_nepal.deleteOne({_id: req.model_id })
                await rimraf.sync(`uploads/model/${req.model_id}`);
                return res.status(500).json({err: 'Please try again later'})
            })
        req.files.map(async data => {
            let create_img = new db.models.model_nepal_img({
                model_nepal_id: req.model_id,
                path: data.path
            })
            await create_img.save()
                .catch(async err => {
                    await db.models.model_nepal.deleteOne({_id: req.model_id })
                    await rimraf.sync(`uploads/model/${req.model_id}`);
                    return res.status(500).json({err: 'Please try again later'})
                })
        })
        res.status(200).json({message: 'Model update'})
    },

    create_model: async (req, res) => {
        const {model_id} = req.body
        let video_description_new = ["Video Description", "Video Description", "Video Description",]
        let model = await db.models.model_nepal.findOne({_id: model_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if (!model) {
            await rimraf.sync(`uploads/model/${model_id}`);
            return res.status(404).json({message: 'Model not found'})
        }
        let videos = []
        let video_list = await req.files.map((data, index) => {
            videos.push({
                model_nepal_id: model_id,
                description: video_description_new[index],
                path: data.path
            })
        })
        const results_video = await Promise.all(video_list)
            .catch(async err => {
                await db.models.model_nepal.deleteOne({_id: model_id })
                await rimraf.sync(`uploads/model/${model_id}`);
                return res.status(500).json({err: 'Please try again later'})
            })
       let video_save = await videos.map(data => {
            let create_video = new db.models.model_nepal_video({
                path: data.path,
                description: data.description
            })
            create_video.save()
        })
        const results_save = await Promise.all(video_save)
            .catch(async err => {
                await db.models.model_nepal.deleteOne({_id: model_id })
                await rimraf.sync(`uploads/model/${model_id}`);
                return res.status(500).json({err: 'Please try again later'})
            })
        let model_update = await db.models.model_nepal.updateOne({_id: model_id}, {draft: false})
            .catch(async err => {
                await db.models.model_nepal.deleteOne({_id: model_id })
                await rimraf.sync(`uploads/model/${model_id}`);
                return res.status(500).json({err: 'Please try again later'})
            })
        res.status(200).json({message: 'Model is create'})
    },

    model_top_get: async(req, res) => {
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let models = await db.models.model_nepal.aggregate([
            { $match: {top: {$gt: 0, $lte: 13}} },
            { $lookup: { from: "model_likes", localField: "_id", foreignField: "model_nepal_id", as: "like"  } },
        ])
        res.status(200).json({models: models})
    },

    model_get: async(req, res) => {
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let models = await db.models.model_nepal.aggregate([
            { $match: {top: {$gt: 13}} },
            { $lookup: { from: "model_likes", localField: "_id", foreignField: "model_nepal_id", as: "like"  } },
        ])
        res.status(200).json({models: models})
    },

    model_item: async(req, res) => {
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let models = await db.models.model_nepal.aggregate([
            { $match: { _id: db.Mongoose.Types.ObjectId(req.params.id) } },
            { $lookup: { from: "model_nepal_imgs", localField: "_id", foreignField: "model_nepal_id", as: "gallery"  } },
            { $lookup: { from: "model_nepal_videos", localField: "_id", foreignField: "model_nepal_id", as: "video"  } },
        ])
        res.status(200).json({models: models})
    }
}
