const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { swagger } = require('./swagger');

swagger(app)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/uploads', express.static(`${__dirname}/uploads`));

const authRoutes = require('./route/auth');
app.use('/auth', authRoutes);

const forgotRoutes = require('./route/forgot_pass');
app.use('/forgot', forgotRoutes);

const modelRoutes = require('./route/model');
app.use('/model', modelRoutes);

const likeRoutes = require('./route/like');
app.use('/like', likeRoutes);

const profileRoutes = require('./route/change_profile');
app.use('/change', profileRoutes);

const advertisementRoutes = require('./route/advertisement');
app.use('/advertisement', advertisementRoutes);

module.exports = app;
