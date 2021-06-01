const db = require('../db');
const bcrypt = require('bcryptjs');

const {mailer, forgot} = require('../notifi/email');


module.exports = {
    send_email: async (req, res) => {
        const { email } = req.body
        let customer_find = await db.models.customer.findOne({email: email})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer_find){
            return res.status(404).json({message: 'Customer by this email not found'})
        }
        let code = Math.floor(Math.random() * 90000) + 10000;
        let customer_update = await db.models.customer.updateOne({email: email}, {code: code})
        await mailer.sendMail(forgot(email, code));
        res.status(200).json({message: 'Email send'})
    },

    send_code: async (req, res) => {
        const { email, code } = req.body
        let customer_find = await db.models.customer.findOne({email: email})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer_find){
            return res.status(404).json({message: 'Customer by this email not found'})
        }
        console.log(customer_find, code);
        if(code !== customer_find.code){
            return res.status(200).json({message: 'Incorect code'})
        }
        res.status(200).json({message: 'Code is correct'})
    },

    change_password: async (req, res) => {
        const { email, password } = req.body
        let customer_find = await db.models.customer.findOne({email: email})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if(!customer_find){
            return res.status(404).json({message: 'Customer by this email not found'})
        }
        let code_new = Math.floor(Math.random() * 90000) + 10000;
        let hashedPassword = bcrypt.hashSync(password, 8);
        let customer_update = await db.models.customer.updateOne({email: email}, {code: code_new, password: hashedPassword})
        res.status(200).json({message: 'Password changes'})
    }
}
