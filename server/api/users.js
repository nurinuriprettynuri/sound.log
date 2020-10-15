import express from "express";
import { updateUserById } from "../utils/queries/users";
import validation from "../middleware/validations";
import { upload } from "../middleware/multer";
import bcrypt from "bcryptjs";
import pool from "../db/db";
import { jwtGenerator } from "../utils/jwtGenerator";
import authorization from "../middleware/authorization";
const userUpload = upload.any();

const router = express.Router();

/**
 * getting user information
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await pool.query(
      `SELECT id as "userId", username, location, email, avatar FROM users WHERE id=$1`,
      [userId]
    );
    return res.json(user.rows[0]);
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

    const jwtToken = jwtGenerator(newUser.rows[0].userId);

    return res.json({ jwtToken, user: newUser.rows[0] });
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

    //compare incoming password with hashed password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    //password validation
    if (!validPassword) {
      return res.status(401).json("Invalid user information");
    }
    const jwtToken = jwtGenerator(user.rows[0].userId);
    return res.json({ jwtToken, user: user.rows[0] });
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/**
 * user profile update by userId
 */

router.patch("/:userId", userUpload, async (req, res) => {
  // const userId = req.userId;
  const { userId } = req.params;

  let [updateQuery, values] = updateUserById(userId, req.body, req.files);

  try {
    const temp = await pool.query(updateQuery, values);
    const user = await pool.query(
      `SELECT id as "userId", username, location, email, password, avatar FROM users WHERE id=$1`,
      [userId]
    );

    res.json(user.rows[0]);
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
    return res.json(deletedUser.rows[0].userId);
  } catch (err) {
    res.status(500).json("Server error");
  }
});

export default router;
