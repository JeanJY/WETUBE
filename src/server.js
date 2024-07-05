import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
// pug form을 자바스크립트로 파싱
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

// app.get("/", (req, res) => {
//   return res.send("<h1>I love you.</h1>");
// });

// app.get("/login", (req, res) => {
//   return res.end();
// });

// const handleListening = () => console.log("server listenting on port 4000");
// app.listen(4000, handleListening);

// function handleListening () {
//     return console.log(`server listenting on port http://localhost:${PORT}`);

// }
// **** {}브라켓이 있고 없고는 return 을 하지않는다 한다의 차이.****
