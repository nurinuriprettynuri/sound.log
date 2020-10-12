import express from "express";

import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import usersRouter from "./api/users";
import tracksRouter from "./api/tracks";
import genresRouter from "./api/genres";
import commentsRouter from "./api/comments";
import likesRouter from "./api/likes";
import path from "path";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/genres", genresRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/likes", likesRouter);

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})
module.exports = app;
