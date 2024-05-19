import express from "express";

const PORT = 4000;
const app = express();

// app.get("/", (req, res) => {
//   return res.send("<h1>I love you.</h1>");
// });

// app.get("/login", (req, res) => {
//   return res.end();
// });

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("Oh middlewares!");
};

app.get("/", logger, handleHome);

app.listen(PORT, () =>
  console.log(`server listenting on port http://localhost:${PORT}`)
);

// const handleListening = () => console.log("server listenting on port 4000");
// app.listen(4000, handleListening);

// function handleListening () {
//     return console.log(`server listenting on port http://localhost:${PORT}`);

// }
// {}브라켓이 있고 없고는 return 을 하지않는다 한다의 차이.
