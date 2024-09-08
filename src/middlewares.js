import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3AvatarStorage = multerS3({
  s3: s3Client,
  bucket: "wetube-clone-by-jean-update",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `avatars/${req.session.user._id}/${Date.now().toString()}`);
  },
});

const s3VideoStorage = multerS3({
  s3: s3Client,
  bucket: "wetube-clone-by-jean-update",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `videos/${req.session.user._id}/${Date.now().toString()}`);
  },
});

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.siteName = "WETUBE";

  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const uploadAvatarMiddleware = multer({
  limits: { fileSize: 5000000 },
  storage: s3AvatarStorage,
});

export const uploadVideoMiddleware = multer({
  limits: { fileSize: 100000000 },
  storage: s3VideoStorage,
});
