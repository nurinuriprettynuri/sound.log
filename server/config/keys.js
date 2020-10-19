require("dotenv").config();

export default {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  AWS_ID: process.env.AWS_ID,
  AWS_SECRET: process.env.AWS_SECRET,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  JWT_KEY: process.env.JWT_KEY,
  REFRESH_JWT_KEY: process.env.REFRESH_JWT_KEY,
};
