import express from "express";
import { upload } from "../middleware/multer";
import pool from "../db/db";

const router = express.Router();
const trackUpload = upload.any();

//fetch all tracks from db
router.get("/", async (req, res) => {
  try {
    const tracks = await pool.query(
      `SELECT t.track_id as "trackId", t.title as title, t.track_file as "audioUrl", t.track_image as "imageUrl", u.user_id as "artistId", u.username as username, u.location as location, l.liked_by as "likedByUser" FROM tracks as t LEFT JOIN likes as l ON t.track_id = l.track_id INNER JOIN users as u ON t.artist_id = u.user_id`
    );

    res.json(tracks.rows);
  } catch (err) {
    res.status(500).send("server error");
  }
});

//fetch one track from db
router.get("/:trackId", async (req, res) => {
  const { trackId } = req.params;

  try {
    const track = await pool.query(
      `SELECT t.track_id as "trackId", t.title as title, t.track_file as "audioUrl", t.track_image as "imageUrl", u.user_id as "artistId", u.username as username, u.location as location, l.liked_by as "likedByUser" FROM tracks as t LEFT JOIN likes as l ON t.track_id = l.track_id INNER JOIN users as u ON t.artist_id = u.user_id WHERE tracks.track_id = $1`,
      [trackId]
    );
    res.json(track.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.get("/:trackId/:userId", async (req, res) => {
  const { trackId, userId } = req.params;
  try {
    const likedByCurrentUser = await pool.query(
      "SELECT * FROM likes WHERE liked_by=$1 AND track_id=$2",
      [userId, trackId]
    );
    if (likedByCurrentUser.rows.length > 0) {
      await pool.query("DELETE FROM likes WHERE liked_by=$1 AND track_id=$2", [
        userId,
        trackId,
      ]);
    } else {
      await pool.query(
        "INSERT INTO likes (liked_by, track_id) VALUES ($1, $2)",
        [userId, trackId]
      );
    }

    const track = await pool.query(
      `SELECT t.track_id as "trackId", t.title as title, t.track_file as "audioUrl", t.track_image as "imageUrl", u.user_id as "artistId", u.username as username, u.location as location, l.liked_by as "likedByUser" FROM tracks as t LEFT JOIN likes as l ON t.track_id = l.track_id INNER JOIN users as u ON t.artist_id = u.user_id WHERE l.liked_by=$1 AND t.track_id=$2`,
      [userId, trackId]
    );

    res.json(track.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.delete("/:trackId", async (req, res) => {
  const { trackId } = req.params;

  try {
    const deleted = await pool.query("DELETE FROM tracks WHERE track_id=$1", [
      trackId,
    ]);

    res.json(deleted.rows[0]);
  } catch (err) {
    res.status(500).send("server error");
  }
});

//create a track data using multer and multer-s3
router.post("/", trackUpload, async function (req, res, next) {
  const { title, genre, artist_id, description } = req.body;
  const image = req.files.filter((e) => e.fieldname === "image");
  const audio = req.files.filter((e) => e.fieldname === "audio");

  try {
    const newTrack = await pool.query(
      "INSERT INTO tracks (title, artist_id, genre_id, description, track_image, track_file) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        title,
        artist_id,
        genre,
        description,
        image[0].location,
        audio[0].location,
      ]
    );

    const track = await pool.query(
      "SELECT tracks.*, users.* FROM tracks INNER JOIN users ON users.user_id = tracks.artist_id WHERE users.user_id = $1",
      [artist_id]
    );
    res.json(track.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
