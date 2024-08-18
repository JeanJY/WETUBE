import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
// pug form을 자바스크립트로 파싱

console.log(
  `MONGODB_URL: ${process.env.MONGODB_URL}, COOKIE_SECRET_KEY: ${process.env.COOKIE_SECRET_KEY}`
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

//static; 브라우저에서 사람들이 볼 수 있게 함.

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
// **** {}브라켓이 있고 return이 없으면 ; 함수로 산출값은 나오지만 반환하여 다음에 다른곳에 쓸곳은 없다. ****
//      {}브라켓이 있고 return이 있으면 ; 함수로 산출한 값을 반환하여 다른곳으로 넘기거나 코딩줄이 여러개일때 원하는 반환값의 함수에 return을 쓰고 종료시킨다.
//      * {}브라켓을 쓸때는 return이 있어야 의도한 값을 반환해서 재사용 한다. *
//      단일 표현식으로 결과를 생성하고 반환할 수 있는 경우, 이렇게 {} 와 return 키워드를 생략 가능. {}을 쓸거라면 꼭 return을 쓰기.
