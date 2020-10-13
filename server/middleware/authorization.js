import jwt from "jsonwebtoken";
import KEYS from "../config/keys";

/**
 * check user's authorization through jwt token from req.header
 *
 */

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader && authHeader.split(" ")[1];

  if (!jwtToken) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  jwt.verify(jwtToken, KEYS.JWT_KEY, (err, payload) => {
    if (err) return res.status(403);
    req.userId = payload.user.userId;
    next();
  });
};
