const express = require("express");
const multer = require("multer");

const User = require("../models/User");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "server/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      imagePath: req.file ? url + "/images/" + req.file.filename : ""
    });
    user
      .save()
      .then(createdUser => {
        res.status(201).json({
          message: "User added successfully",
          user: { id: createdUser._id }
        });
      })
      .catch(error => {
        res.status(422).json({ message: "Create user failed" });
      });
  }
);

router.get("", (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users
      });
    })
    .catch(error => {
      res.status(422).json({ message: "Fetch users failed" });
    });
});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "User deleted!" });
    })
    .catch(error => {
      res.status(422).json({ message: "Delete user failed" });
    });
});

module.exports = router;
