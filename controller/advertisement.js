const fs = require('fs')
const db = require('../db')

module.exports = {
    advertisement_add: async (req, res) => {
        const {name, coin_count} = req.body;
       /* let admin = await db.models.customer.findOne({$and: [{_id: req.customer_id}, {role: 'admin'}]})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!admin){
            return res.status(404).json({message: 'Customer not found'})
        }*/
        if(!req.file){
            return res.status(411).json({message: 'Video is required'})
        }
        let advertisement = new db.models.advertisement({name, coin_count, path: req.file.path})
        advertisement.save()
            .catch(err => {
                fs.unlink(req.file.path)
                return res.status(500).json({err: 'Please try again later'})
            })
        res.status(200).json({message: 'Advertisement is created'})
    },

    advertisement_get: async (req, res) => {
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let advertisement = db.models.advertisement.findOne({})
        res.status(200).json({advertisement: advertisement})
    },

    advertisement_coin: async (req, res) => {
        const {advertisement_id} = req.body
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let advertisement = await db.models.advertisement.findOne({_id: advertisement_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!advertisement){
            return res.status(404).json({message: 'Customer not found'})
        }
        let coin = customer.coin + advertisement.coin_count
        await db.models.customer.updateOne({_id: req.customer_id}, {coin: coin})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        res.status(200).json({message: 'Coin is add'})
    }
}
