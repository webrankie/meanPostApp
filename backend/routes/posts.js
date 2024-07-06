const express = require("express");
const Post = require("../models/post");
const multer = require("multer");

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

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath,
      }
    });
  });
});

router.put('/:id', multer({storage: storage}).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      imagePath = url + "/images/" + req.file.filename;
    }
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
    console.log("Post updated Info: ", post);
  Post.updateOne({_id: req.params.id}, {title: req.body.title, content: req.body.content}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post updated successfully!"});
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
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

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

module.exports = router;
