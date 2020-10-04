import express from "express";
import pool from "../db/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const likes = await pool.query(
      `SELECT track FROM likes GROUP BY track ORDER BY COUNT(track) LIMIT 10`
    );

    const trendyTracks = likes.rows.map((e) => e.track);

    res.json(trendyTracks);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await pool.query(
      `SELECT track FROM likes WHERE liked_by=$1`,
      [userId]
    );

    const trendyTracks = likes.rows.map((e) => e.track);

    res.json(trendyTracks);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/:userId/:trackId", async (req, res) => {
  const { userId, trackId } = req.params;

  try {
    await pool.query(`INSERT INTO likes (liked_by, track) VALUES ($1, $2)`, [
      userId,
      trackId,
    ]);
    const trendyTracks = await pool.query(
      `SELECT track FROM likes WHERE liked_by=$1 AND track=$2`,
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
      `DELETE FROM likes WHERE liked_by=$1 AND track=$2`,
      [userId, trackId]
    );
    res.json(trackId);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
