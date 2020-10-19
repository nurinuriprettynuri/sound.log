import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import KEYS from "../config/keys";

AWS.config.update({
  secretAccessKey: KEYS.AWS_SECRET,
  accessKeyId: KEYS.AWS_ID,
  region: "us-west-1",
});

export const s3 = new AWS.S3();

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: KEYS.AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
