const fs = require('fs');
const path = require('path');
const multer = require('multer');
const moment = require('moment');

const storage_model_img = multer.diskStorage({
    destination(req, file, done) {
        if (!fs.existsSync(`uploads/model/${req.model_id}/img`)) {
            fs.mkdirSync(`uploads/model/${req.model_id}/img`, {recursive: true});
        }
        done(null, `uploads/model/${req.model_id}/img`);
    },

    filename(req, file, done) {
        done(null, file.fieldname + '-' + moment().format('DD.MM.YYYY-HH.mm.ss.SSS') + path.extname(file.originalname));
    }
});
const storage_model_video = multer.diskStorage({
    destination(req, file, done) {
        if (!fs.existsSync(`uploads/model/${req.body.model_id}/video`)) {
            fs.mkdirSync(`uploads/model/${req.body.model_id}/video`, {recursive: true});
        }
        done(null, `uploads/model/${req.body.model_id}/video`);
    },

    filename(req, file, done) {
        done(null, file.fieldname + '-' + moment().format('DD.MM.YYYY-HH.mm.ss.SSS') + path.extname(file.originalname));
    }
});
const storage_advertisement_video = multer.diskStorage({
    destination(req, file, done) {
        if (!fs.existsSync(`uploads/advertisement/`)) {
            fs.mkdirSync(`uploads/advertisement/`, {recursive: true});
        }
        done(null, `uploads/advertisement/`);
    },

    filename(req, file, done) {
        done(null, file.fieldname + '-' + moment().format('DD.MM.YYYY-HH.mm.ss.SSS') + path.extname(file.originalname));
    }
});

const fileImg = (req, file, done) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        done(null, true);
    } else {
        done(null, false);
    }
};

const fileVideo = (req, file, done) => {
    if (file.mimetype === 'video/mp4') {
        done(null, true);
    } else {
        done(null, false);
    }
};

const limitsVideo = {fileSize: 1024 * 1024 * 1024 * 1024 * 5};
const limitsPhoto = {fileSize: 1024 * 1024  * 5};

const model_img = multer({storage: storage_model_img, fileImg, limitsPhoto});
const model_video = multer({storage: storage_model_video, fileVideo, limitsVideo});
const advertisement_video = multer({storage: storage_advertisement_video, fileVideo, limitsVideo});

module.exports = {
    model_img,
    model_video,
    advertisement_video
}
