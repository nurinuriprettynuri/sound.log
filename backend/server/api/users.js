import express from "express";

import validation from "../middleware/validations";

import bcrypt from "bcryptjs";
import pool from "../db/db";
import dotenv from "dotenv";
import { jwtGenerator } from "../utils/jwtGenerator";
import authorization from "../middleware/authorization";

dotenv.config();
const router = express.Router();

//user registeration
router.post("/", async (req, res) => {
  const { username, email, password, location } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, location) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, bcryptPassword, location]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ jwtToken, userId: newUser.rows[0].user_id });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//user signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body.user;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

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

    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken, user });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource?");
// });

// router.post("/upload-avatar", async (req, res) => {
//   try {
//     if (!req.files) {
//       res.send({
//         status: false,
//         message: "No file uploaded",
//       });
//     } else {
//       //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//       let avatar = req.files.avatar;

//       //Use the mv() method to place the file in upload directory (i.e. "uploads")
//       avatar.mv("./uploads/" + avatar.name);

//       //send response
//       res.send({
//         status: true,
//         message: "File is uploaded",
//         data: {
//           name: avatar.name,
//           mimetype: avatar.mimetype,
//           size: avatar.size,
//         },
//       });
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.post("/upload-profile-pic", (req, res) => {
//   // 'profile_pic' is the name of our file input field in the HTML form
//   let upload = multer({
//     storage: storage,
//     fileFilter: helpers.imageFilter,
//   }).single("profile_pic");

//   upload(req, res, function (err) {
//     // req.file contains information of uploaded file
//     // req.body contains information of text fields, if there were any

//     if (req.fileValidationError) {
//       return res.send(req.fileValidationError);
//     } else if (!req.file) {
//       return res.send("Please select an image to upload");
//     } else if (err instanceof multer.MulterError) {
//       return res.send(err);
//     } else if (err) {
//       return res.send(err);
//     }

//     // Display uploaded image for user validation
//     res.send(
//       `You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`
//     );
//   });
// });

module.exports = router;
