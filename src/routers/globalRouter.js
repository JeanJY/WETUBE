import express from "express";
import { join, login } from "../controllers/userController";
import { trending, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
// 변수만 export 하는 중. globalRouter.js 전체가 아니라.?? default와 개별 export 차이? 라우터와 컨트롤러 따로 두기??
// 디폴트 추출은 임폴트페이지에서 이름을 뭘로 설정하던 상관 없음
