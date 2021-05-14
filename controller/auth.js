const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../db')


signToken = (customer) => {
    return jwt.sign({
        sub: customer.id,
        email: customer.email,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.JWTSECRET);
}

module.exports = {
    signin: async (req, res) => {
        const {email, password} = req.body;
        let customer_find = await db.models.customer.findOne({email: email}).select('+password')
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if (!customer_find) {
            return res.status(404).json({message: 'Invalid email or password'})
        }
        let passwordIsValid = bcrypt.compareSync(password, customer_find.password);
        if (!passwordIsValid) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const token = signToken(customer_find);
        res.status(200).json({
            token: token,
            id: customer_find._id,
            first_name: customer_find.first_name,
            last_name: customer_find.last_name,
            email: customer_find.email
        })
    },

    signup: async (req, res) => {
        const { first_name, last_name, email, password } = req.body;
        let customer_find = await db.models.customer.findOne({email: email}, {password: 0})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if (customer_find) {
            return res.status(411).json({err: 'Customer by this email already exists'})
        }
        let hashedPassword = bcrypt.hashSync(password, 8);
        let customer = new db.models.customer({first_name, last_name, email, password: hashedPassword})
        let customer_create = await customer.save();
        res.status(200).json({message: 'Customer create'})
    },

    me: async (req, res) => {
        let customer_find = await db.models.cutomer.findOne({_id: req.customer_id})
            .catch(err => {
                return res.status(500).json({err: 'Please try again later'})
            })
        if (customer_find) {
            return res.status(411).json({err: 'Customer by this email already exists'})
        }
        res.status(200).json({customer_find})
    }
}
