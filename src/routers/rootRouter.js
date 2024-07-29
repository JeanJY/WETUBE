import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
// 변수만 export 하는 중. globalRouter.js 전체가 아니라.?? default와 개별 export 차이? 라우터와 컨트롤러 따로 두기??
// 디폴트 추출은 임폴트페이지에서 이름을 뭘로 설정하던 상관 없음
