import express from "express";
import { updateUserById } from "../utils/queries/users";
import validation from "../middleware/validations";
import { upload } from "../middleware/multer";
import bcrypt from "bcryptjs";
import pool from "../db/db";
import dotenv from "dotenv";
import { jwtGenerator } from "../utils/jwtGenerator";
import authorization from "../middleware/authorization";

dotenv.config();

const router = express.Router();
const userUpload = upload.any();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [userId]);
    return res.json(user.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

/**
 * user sign up
 */
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email);
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    console.log(bcryptPassword);
    const newUser = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id as "userId", username, password`,
      [username, email, bcryptPassword]
    );

    console.log(newUser);
    const jwtToken = jwtGenerator(newUser.rows[0].id);

    return res.json({ jwtToken, ...newUser.rows[0] });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

/**
 * user sign in email and password
 */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      `SELECT id as "userId", username, location, email, password FROM users WHERE email = $1`,
      [email]
    );
    console.log(user);

    //email validation
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid user information");
    }

    //compare incoming password with hashed password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    //password validation
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).json("Invalid user information");
    }
    const jwtToken = jwtGenerator(user.rows[0].userId);
    return res.json({ jwtToken, ...user.rows[0] });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

/**
 * user profile update by userId
 */

router.patch("/:userId", userUpload, async (req, res) => {
  const { userId } = req.params;
  let [updateQuery, values] = updateUserById(userId, req.body, req.files);
  console.log(updateQuery);

  try {
    const user = await pool.query(updateQuery, values);
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

/**
 * verify user's jwt token
 */

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

/**
 * delete user
 */

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await pool.query(
      `DELETE FROM users WHERE id=$1 RETURNING id as "userId"`,
      [userId]
    );
    return res.json(deletedUser.rows[0].userId);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
