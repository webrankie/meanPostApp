const multer = require("multer");


const MIME_TYPE_MAP = {
  'image/jpg': "jpg",
  'image/png': "png",
  'image/jpeg': "jpeg"
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("File Type is invalid");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now().toString()}.${ext}`);
  }
})


module.exports = multer({storage: storage}).single("image");
