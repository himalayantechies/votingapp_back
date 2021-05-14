module.exports = (mongoose) => {
    let ModelNepalVideoSchema = new mongoose.Schema({
        model_nepal_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ModelNepal'
        },
        description: String,
        path: String,
    }, {versionKey: null, timestamps: true,});

    let ModelNepalVideo = mongoose.model('Model_Nepal_Video', ModelNepalVideoSchema);
    return ModelNepalVideo;
};
