module.exports = (mongoose) => {

    let ModelLikeSchema = new mongoose.Schema({
        model_nepal_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ModelNepal'
        },
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Customer'
        },
    }, {versionKey: null, timestamps: true,});

    let ModelLike = mongoose.model('Model_Like', ModelLikeSchema);
    return ModelLike
};
