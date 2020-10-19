import jwt from "jsonwebtoken";
import KEYS from "../config/keys";

export const jwtGenerator = async (userId) => {
  const payload = {
    user: {
      userId,
    },
  };

  const accessToken = jwt.sign(payload, KEYS.JWT_KEY, { expiresIn: "20m" });
  const refreshToken = jwt.sign(payload, KEYS.REFRESH_JWT_KEY, {
    expiresIn: "7d",
  });
  return Promise.all([accessToken, refreshToken]);
};

export const refreshTokens = async (refreshToken) => {
  try {
    const {
      user: { userId },
    } = jwt.verify(refreshToken, KEYS.REFRESH_JWT_KEY);

    const [newAccessToken, newRefreshToken] = await jwtGenerator(userId);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    console.log(err);
    return {};
  }
};
