import express from "express";
import { upload } from "../utils/multer";
import { updateTrackById } from "../utils/queries/tracks";
import pool from "../db/db";
import authorization from "../middleware/authorization";
const trackUpload = upload.any();
const router = express.Router();

/**
 * fetch all tracks
 */
router.get("/", async (req, res) => {
  try {
    const tracks = await pool.query(
      `SELECT t.id as "trackId", t.title as title, t.audio as "audioUrl", t.image as "imageUrl", t.description as description, u.id as "artistId", u.username as username, u.location as location, u.avatar as avatar FROM tracks as t INNER JOIN users as u ON t.artist = u.id ORDER BY t.created_at DESC`
    );

    res.json(tracks.rows);
  } catch (err) {
    res.status(500).json("server error");
  }
});

/**
 * fetch a track by trackId
 */
router.get("/:trackId", authorization, async (req, res) => {
  const { trackId } = req.params;

  try {
    const track = await pool.query(
      `SELECT t.id as "trackId", t.title as title, t.audio as "audioUrl", t.image as "imageUrl", t.description as description, u.id as "artistId", u.username as username, u.location as location, u.avatar as avatar FROM tracks as t INNER JOIN users as u ON t.artist = u.id WHERE t.id = $1`,
      [trackId]
    );

    res.json(track.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

/**
 * delete a track by trackId
 */
router.delete("/:trackId", authorization, async (req, res) => {
  const { trackId } = req.params;

  try {
    const deleted = await pool.query(
      `DELETE FROM tracks WHERE id=$1 RETURNING id as "trackId"`,
      [trackId]
    );

    res.json(deleted.rows[0].trackId);
  } catch (err) {
    res.status(500).send("server error");
  }
});

/**
 * patch(update) a track data by trackId
 */
router.patch("/:trackId", authorization, trackUpload, async (req, res) => {
  const { trackId } = req.params;

  const [updateQuery, values] = updateTrackById(trackId, req.body, req.files);

  try {
    const updatedTrack = await pool.query(updateQuery, values);
    const track = await pool.query(
      "SELECT tracks.*, users.* FROM tracks INNER JOIN users ON users.id = tracks.artist WHERE tracks.id=$1",
      [updatedTrack.rows[0].trackId]
    );

    res.json(track.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

/**
 *create a track data using multer and multer-s3
 */

router.post("/", authorization, trackUpload, async function (req, res) {
  const { title, genre, artist, description } = req.body;
  const image = req.files.filter((e) => e.fieldname === "image");
  const audio = req.files.filter((e) => e.fieldname === "audio");

  try {
    const newTrack = await pool.query(
      "INSERT INTO tracks (title, artist, genre, description, image, audio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, artist, genre, description, image[0].location, audio[0].location]
    );

    const track = await pool.query(
      "SELECT tracks.*, users.* FROM tracks INNER JOIN users ON users.id = tracks.artist WHERE users.id = $1",
      [artist]
    );

    res.json(track.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
