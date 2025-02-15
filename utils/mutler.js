const multer = require("multer"),
    path = require("path");

// multer config

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, cd, file) => {
        let ext
        ext = path.extname(`${file.originalname} ${Math.random() * 23457}`);
        if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpng") {
            cb(new Error("this website doesn't support the file"), false);
            return;
        }
        cd(null, true)
    }
})