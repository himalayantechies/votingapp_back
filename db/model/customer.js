module.exports = (mongoose) => {
    let CustomerSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        email: {
            type: String,
            unique: true,
            required: true
        },
        gender: String,
        password: {
            type: String,
            required: true,
            select: false
        },
        code: String,
        languages: String
    }, {versionKey: null, timestamps: true,});

    let Customer = mongoose.model('Customer', CustomerSchema);
    return Customer;
};
