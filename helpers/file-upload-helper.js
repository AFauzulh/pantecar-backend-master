const multer = require('multer');
const { v4 } = require('uuid');

class FileUploadHelper {
    constructor(app) {
        const fileStorage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "data/images");
            },
            filename: (req, file, callback) => {
                callback(null, v4() + `-${file.originalname}`)
            }
        });

        const fileFilter = (req, file, callback) => {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) { callback(null, true); } else { callback(null, false); }
        }

        app.use(
            multer({
                storage: fileStorage,
                fileFilter: fileFilter
            }).single("image")
        );
    }
}

exports.FileUploadHelper = FileUploadHelper;