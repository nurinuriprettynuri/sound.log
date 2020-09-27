import express from "express";

import cookieParser from "cookie-parser";
import logger from "morgan";

import cors from "cors";
import bodyParser from "body-parser";

import indexRouter from "./api/index";
import usersRouter from "./api/users";
import tracksRouter from "./api/tracks";
import genresRouter from "./api/genres";

const app = express();

app.use(cors());
app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/genres", genresRouter);

module.exports = app;
