const fs = require('fs');
const path = require('path');
let Mongoose = require('mongoose');
const models = {};

const mongoose = Mongoose.connect(process.env.URI, {useUnifiedTopology: true ,  useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, }, (err)=> {
    if(err){
        return  console.log(err);
    }
    console.log('connect')
});

fs.readdirSync(path.join(__dirname, 'model'))
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, 'model', file))(Mongoose);
        let db_name = file.replace('.js', '');
        models[db_name] = model;
    });


module.exports = {
    models,
    mongoose,
    Mongoose
};
