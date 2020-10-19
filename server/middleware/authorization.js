import jwt from "jsonwebtoken";
import { refreshTokens } from "../utils/jwtGenerator";
import KEYS from "../config/keys";

/**
 * check user's authorization through jwt token from req.header
 *
 */

export default async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  try {
    const {
      user: { userId },
    } = jwt.verify(accessToken, KEYS.JWT_KEY);

    req.userId = userId;
    next();
  } catch (err) {
    res.status(403).json(err);
  }
};
