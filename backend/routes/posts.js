const express = require("express");
const Post = require("../models/post");
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

router.post(
  "",
  checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        ...createdPost,
        id: createdPost._id,
      }
    });
  });
});

router.put(
  "/:id", checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
    console.log("Post updated Info: ", post);
    Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post)
      .then(result => {
    console.log(result);
    if(result.modifiedCount > 0) {
      res.status(200).json({message: "Post updated successfully!"});
    } else {
      res.status(401).json({message: "Not authorized from post rounds method put"});
    }
  });
});

router.get("", async (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;

  try {
    const postQuery = Post.find();

    if (pageSize && currentPage) {
      postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    const fetchedPost = await postQuery;
    const count = await Post.countDocuments();

    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPost,
      maxPosts: count
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching posts failed from post routs, line 94!",
      error: error
    });
  }
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: "Post not found!"});
    }
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    console.log(result);
    if(result.deletedCount > 0) {
      res.status(200).json({message: "Post deleted!"});
    } else {
      res.status(401).json({message: "Not authorized from post routes method delete"});
    }
  });
});

module.exports = router;
