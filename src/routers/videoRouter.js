import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();
// const handleWatchVideo = (req, res) => res.send("Watch Video");
// const handleEdit = (req, res) => res.send("Edit Video");

// videoRouter.get("/:id", see);
// videoRouter.get("/upload", upload);
// videoRouter.get("/:id/edit", edit);
// videoRouter.get("/:id/delete", deleteVideo);

videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

export default videoRouter;
