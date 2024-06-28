import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  //   deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;

// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
// -----------------------------
// videoRouter.get("/:id(\\d+)/delete", deleteVideo);

// const handleWatchVideo = (req, res) => res.send("Watch Video");
// const handleEdit = (req, res) => res.send("Edit Video");

// videoRouter.get("/:id", see);
// videoRouter.get("/upload", upload);
// videoRouter.get("/:id/edit", edit);
// videoRouter.get("/:id/delete", deleteVideo);
