const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");
const multer = require("multer");
const { postController } = require("../controller");
// const { authorizedLoggedInUser } = require('../middleware/authMiddleware');

const upload = multer({
  limits: {
    fileSize: 100000000000, //Byte
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File harus berupa png,jpg,jpeg"), false);
    }
    cb(null, true);
  },
});

router.get("/", postController.getAllPost);

router.post(
  "/upload",
  fileUploader({
    destinationFolder: "post_images", 
    fileType: "image",
    prefix: "POST",
  }).single("image"),
  postController.uploadPost
);

// router.post("/", postController.addPost);

router.patch("/:id", postController.editPost);

router.delete("/:id", postController.deletePost);

router.get("/paging", postController.getPostPaging);

router.get("/:username", postController.getPostByUser);

router.get("/", postController.getAllPost);

router.get("/like/:id", postController.getPostByLiked);

router.get("/specific/:id", postController.getPostById)

module.exports = router;
