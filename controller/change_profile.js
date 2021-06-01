const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../db')

module.exports = {
    change_profile: async (req, res) => {
        const {first_name, last_name, email} =req.body;
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let customer_update = await db.models.customer.updateOne({_id: req.customer_id}, {first_name, last_name, email})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        res.status(200).json({message: 'Profile is update'})
    },

    change_password: async (req, res) => {
        const {old_password, new_password} =req.body;
        let customer = await db.models.customer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer){
            return res.status(404).json({message: 'Customer not found'})
        }
        let passwordIsValid = bcrypt.compareSync(old_password, customer.password);
        if (!passwordIsValid) {
            return res.status(401).json({message: 'Invalid old password'});
        }
        let hashedPassword = bcrypt.hashSync(new_password, 8);
        await db.models.customer.updateOne({_id: req.customer_id}, {password: hashedPassword})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        res.status(200).json({message: 'Profile is update'})
    }
}
