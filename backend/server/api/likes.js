import express from "express";
import pool from "../db/db";

export const router = express.Router();

router.get("/", (req, res) => {
  const { userId, trackId } = req.params;
    pool.query("SELECT * FROM likes ORDER BY likes.track_id LIMIT 5");
});
