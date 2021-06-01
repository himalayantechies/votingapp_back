module.exports = (mongoose) => {
    let AdvertisementSchema = new mongoose.Schema({
        path: String,
        name: String,
        coin_count: String
    }, {versionKey: null, timestamps: true,});

    let Advertisement = mongoose.model('Advertisement', AdvertisementSchema);
    return Advertisement;
};
