import jwt from "jsonwebtoken";
import KEYS from "../config/keys";

/**
 * check user's authorization through jwt token from req.header
 *
 */

export default (req, res, next) => {
  const jwtToken = req.header("jwtToken");
  if (!jwtToken) {
    return res.status(403).json({ msg: "authorization denied" });
  }
  // Verify token
  try {
    console.log(KEYS.JWT_KEY);
    const payload = jwt.verify(jwtToken, KEYS.JWT_KEY);
    console.log(payload);

    req.userId = payload.user.userId;
    next();
  } catch (err) {
    res.status(401).json("Not Authorized");
  }
};
