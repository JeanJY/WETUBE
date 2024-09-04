import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB!");
const handleError = (error) => console.log("DB Error", error);

db.once("open", handleOpen);
db.on("error", handleError);

// on과 once의 차이 그리고 저렇게 사용한 목적은?
