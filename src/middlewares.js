import multer from "multer";

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
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadAvatarMiddleware = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
});

export const uploadVideoMiddleware = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 10000000 },
});
