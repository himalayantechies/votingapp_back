const {body} = require('express-validator');

module.exports.signin = [

    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

    body('password')
        .trim()
        .isLength({min: 8}).withMessage('Cannot be less than 8 characters'),

];

module.exports.signup = [

    body('first_name')
        .trim()
        .not().isEmpty().withMessage('First name is required'),

    body('last_name')
        .trim()
        .not().isEmpty().withMessage('Last name is required'),

    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

    body('password')
        .trim()
        .not().isEmail().withMessage('Password is required')
        .isLength({min: 8}).withMessage('Cannot be less than 8 characters'),


    body('confirm_password')
        .trim()
        .not().isEmpty().withMessage('Confirm password is required')
        .custom((value, {req}) => (value === req.body.password)).withMessage('Password mismatch'),

];

module.exports.forgot_email = [

    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

];

module.exports.forgot_code = [

    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

    body('code')
        .trim()
        .not().isEmpty().withMessage('Code is required'),
];

module.exports.forgot_password = [

    body('password')
        .trim()
        .isLength({min: 8}).withMessage('Cannot be less than 8 characters'),

    body('confirm_password')
        .trim()
        .isLength({min: 8}).withMessage('Password mismatch')
        .custom((value, {req}) => (value === req.body.password)).withMessage('Password mismatch')
];

module.exports.model_step_one = [

    body('full_name')
        .trim()
        .not().isEmpty().withMessage('Full name is required'),

    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

    body('country')
        .trim()
        .not().isEmpty().withMessage('Country is required'),

    body('city')
        .trim()
        .not().isEmpty().withMessage('City is required'),

    body('hight')
        .trim()
        .not().isEmpty().withMessage('Hight is required'),

    body('weight')
        .trim()
        .not().isEmpty().withMessage('Weight is required'),

    body('age')
        .trim()
        .not().isEmpty().withMessage('Age is required'),

    body('self_introduction')
        .trim()
        .not().isEmpty().withMessage('Self introduction is required'),

    body('hobby_strength')
        .trim()
        .not().isEmpty().withMessage('Hobby strength is required'),

    body('experiences')
        .trim()
        .not().isEmpty().withMessage('Experiences is required'),

    body('votes')
        .trim()
        .not().isEmpty().withMessage('Votes is required'),

];

module.exports.model_step_two = [

    body('video_description')
        .trim()
        .not().isEmpty().withMessage('Video description is required'),

    body('model_id')
        .trim()
        .not().isEmpty().withMessage('Model id is required')

];

module.exports.change_profile = [

    body('first_name')
        .trim()
        .not().isEmpty().withMessage('First name is required'),

    body('last_name')
        .trim()
        .not().isEmpty().withMessage('Last name is required'),

    body('email')
        .trim()
        .not().isEmpty().withMessage('E-mail is required')
        .isEmail().withMessage('Please provide a valid email address'),

];

module.exports.change_password = [

    body('old_password')
        .trim()
        .not().isEmpty().withMessage('Old password is required'),

    body('new_password')
        .trim()
        .not().isEmpty().withMessage('New password is required'),

];

module.exports.advertisement_add = [

    body('name')
        .trim()
        .not().isEmpty().withMessage('Old password is required'),

    body('coin_count')
        .trim()
        .not().isEmpty().withMessage('New password is required'),

];
