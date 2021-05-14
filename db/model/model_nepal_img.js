module.exports = (mongoose) => {
    let ModelNepalImgSchema = new mongoose.Schema({
        model_nepal_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ModelNepal'
        },
        path: String,
    }, {versionKey: null, timestamps: true,});

    let ModelNepalImg = mongoose.model('Model_Nepal_Img', ModelNepalImgSchema);
    return ModelNepalImg;
};
