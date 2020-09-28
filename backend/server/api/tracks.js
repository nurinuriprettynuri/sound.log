import express from "express";
import { upload } from "../middleware/multer";
import pool from "../db/db";

const router = express.Router();
const trackUpload = upload.any();

//fetch all tracks from db
router.get("/", async (req, res) => {
  try {
    const tracks = await pool.query(
      "SELECT tracks.*, users.* FROM tracks INNER JOIN users ON users.user_id = tracks.artist_id ORDER BY tracks.created_at LIMIT 5"
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
      "SELECT tracks.*, users.* FROM tracks INNER JOIN users ON users.user_id = tracks.artist_id WHERE tracks.track_id = $1",
      [trackId]
    );

    res.json(track.rows[0]);
  } catch (err) {
    // console.log(err);
    res.status(500).send("server error");
  }
});

//create a track data using multer and multer-s3
router.post("/", trackUpload, async function (req, res, next) {
  const { title, genre, artist_id, description } = req.body;
  const image = req.files.filter((e) => e.fieldname === "image");
  const audio = req.files.filter((e) => e.fieldname === "audio");
  console.log(image, audio);

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
