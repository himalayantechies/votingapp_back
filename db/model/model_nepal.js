module.exports = (mongoose) => {

    let ModelNepalSchema = new mongoose.Schema({
        full_name: String,
        email: String,
        country: String,
        city: String,
        hight: Number,
        weight: Number,
        age: Number,
        self_introduction: String,
        hobby_strength: String,
        experiences: String,
        votes: Number,
        front_img: String,
        top: Number,
        draft: Boolean,
    }, {versionKey: null, timestamps: true,});

    let ModelNepal = mongoose.model('Model_Nepal', ModelNepalSchema);
    return ModelNepal
};
