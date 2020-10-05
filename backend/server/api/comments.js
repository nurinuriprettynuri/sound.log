import express from "express";
import pool from "../db/db";

const router = express.Router();

router.get("/:trackId", async (req, res) => {
  const { trackId } = req.params;
  try {
    const comments = await pool.query(
      `SELECT c.body as body, c.id as "commentId", c.track_id as "trackId", u.username as username, u.avatar as avatar FROM comments as c INNER JOIN users as u ON u.id = c.user_id WHERE c.track_id = $1`,
      [trackId]
    );

    res.json(comments.rows);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  const { userId, trackId, body } = req.body;

  try {
    const newComment = await pool.query(
      "INSERT INTO comments (user_id, track_id, body) VALUES ( $1, $2, $3 ) RETURNING id",
      [userId, trackId, body]
    );
    const comment = await pool.query(
      `SELECT c.body as body, c.id as "commentId", c.track_id as "trackId", u.username as username, u.avatar as avatar FROM comments as c INNER JOIN users as u ON u.id = c.user_id WHERE c.id=$1`,
      [newComment.rows[0].id]
    );

    res.send(comment.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
