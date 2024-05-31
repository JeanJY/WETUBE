let videos = [
  {
    title: "First video",
    rating: 5,
    comments: 2,
    createdAt: "1min ago",
    views: 70,
    id: 1,
  },
  {
    title: "Second video",
    rating: 4,
    comments: 5,
    createdAt: "3min ago",
    views: 50,
    id: 2,
  },
  {
    title: "Third video",
    rating: 3.5,
    comments: 2,
    createdAt: "5min ago",
    views: 70,
    id: 3,
  },
];

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const see = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}` });
};
export const edit = (req, res) => res.render("Edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
