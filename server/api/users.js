import express from "express";
import { updateUserById } from "../utils/queries/users";
import validation from "../middleware/validations";
import { upload } from "../utils/multer";
import bcrypt from "bcryptjs";
import pool from "../db/db";
import { jwtGenerator, refreshTokens } from "../utils/jwtGenerator";
import authorization from "../middleware/authorization";
const userUpload = upload.any();

const router = express.Router();

/**
 * getting user/artist information
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await pool.query(
      `SELECT id as "userId", username, location, email, avatar, bio FROM users WHERE id=$1`,
      [userId]
    );

    res.json({ user: user.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
});

/**
 * user sign up
 */
router.post("/", validation, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("Existing user email");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id as "userId", username, password, avatar`,
      [username, email, bcryptPassword]
    );

    //generate tokens
    const [accessToken, refreshToken] = await jwtGenerator(
      newUser.rows[0].userId
    );

    res.json({ user: newUser.rows[0], accessToken, refreshToken });
  } catch (err) {
    res.status(500).json("Server error");
  }
});

/**
 * user sign in email and password
 */
router.post("/signin", validation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      `SELECT id as "userId", username, location, email, password, avatar FROM users WHERE email = $1`,
      [email]
    );

    //email validation
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid user information");
    }

    //password validation
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Invalid user information");
    }

    //generate tokens
    const [accessToken, refreshToken] = await jwtGenerator(user.rows[0].userId);

    res.json({ user: user.rows[0], accessToken, refreshToken });
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/**
 * user profile update by userId
 */
router.patch("/:userId", authorization, userUpload, async (req, res) => {
  const userId = req.userId;

  if (userId !== req.params.userId) res.status(403);

  let [updateQuery, values] = updateUserById(userId, req.body, req.files);

  try {
    const temp = await pool.query(updateQuery, values);
    const user = await pool.query(
      `SELECT id as "userId", username, location, email, password, avatar FROM users WHERE id=$1`,
      [userId]
    );

    res.json({ user: user.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

/**
 * delete user
 */
router.delete("/", authorization, async (req, res) => {
  const { userId } = req;

  try {
    const deletedUser = await pool.query(
      `DELETE FROM users WHERE id=$1 RETURNING id as "userId"`,
      [userId]
    );
    res.json({ userId: deletedUser.rows[0].userId });
  } catch (err) {
    res.status(500).json("Server error");
  }
});

/**
 * refresh access token when expired
 */
router.post("/auth", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const newTokens = await refreshTokens(refreshToken);

    if (newTokens.accessToken && newTokens.refreshToken) {
      return res.status(201).json(newTokens);
    }
  } catch (err) {
    res.status(403).json({ msg: "authorization denied" });
  }
});

export default router;
