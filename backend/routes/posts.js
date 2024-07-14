const express = require("express");
const PostsController = require("../controllers/posts")

const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

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
    cb(error, "backend/images");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now().toString()}.${ext}`);
  }
})

router.post( "",
  checkAuth,
  multer({storage: storage}).single("image"),
  PostsController.createPost
);

router.put("/:id",
  checkAuth,
  multer({storage: storage}).single("image"),
  PostsController.updatePost
);

router.get( "",
  PostsController.getPosts
);

router.get( "/:id",
  PostsController.getPost
);

router.delete( "/:id",
  checkAuth,
  PostsController.deletePost
);

module.exports = router;
