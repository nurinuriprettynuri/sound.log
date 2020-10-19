import express from "express";
import pool from "../db/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const likes = await pool.query(
      `SELECT track_id as track FROM likes GROUP BY track_id ORDER BY COUNT(track_id) LIMIT 10`
    );

    const trendyTracks = likes.rows.map((e) => e.track);

    res.json(trendyTracks);
   
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await pool.query(
      `SELECT track_id as track FROM likes WHERE liked_by=$1`,
      [userId]
    );

    const trendyTracks = likes.rows.map((e) => e.track);

    res.json(trendyTracks);
  
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/:userId/:trackId", async (req, res) => {
  const { userId, trackId } = req.params;

  try {
    await pool.query(`INSERT INTO likes (liked_by, track_id) VALUES ($1, $2)`, [
      userId,
      trackId,
    ]);
    const trendyTracks = await pool.query(
      `SELECT track_id as track FROM likes WHERE liked_by=$1 AND track_id=$2`,
      [userId, trackId]
    );

    res.json(trendyTracks.rows[0].track);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.delete("/:userId/:trackId", async (req, res) => {
  const { userId, trackId } = req.params;

  try {
    const trendyTracks = await pool.query(
      `DELETE FROM likes WHERE liked_by=$1 AND track_id=$2`,
      [userId, trackId]
    );
    res.json(trackId);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

export default router;
