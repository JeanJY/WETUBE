import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB!");
db.once("open", handleOpen);
db.on("error", (handleError) => console.log("DB Error, error"));

//????
// on과 once의 차이 그리고 니콜라스가 저렇게 사용한 목적은?????
