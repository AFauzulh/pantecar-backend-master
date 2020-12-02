const multer = require('multer');
const { v4 } = require('uuid');

class FileUploadHelper {
    constructor() {
        this.fileStorage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "data/images");
            },
            filename: (req, file, callback) => {
                callback(null, v4() + `-${file.originalname}`)
            }
        });

        this.fileFilter = (req, file, callback) => {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) { callback(null, true); } else { callback(null, false); }
        }
    }

    getMulter() {
        return multer({
            storage: this.fileStorage,
            fileFilter: this.fileFilter
        })
    }
}

exports.FileUploadHelper = FileUploadHelper;