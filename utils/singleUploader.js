const path = require("path");
const multer = require("multer");
const createError = require("http-errors");

const uploader = ({ folderPath, allowedFileTypes, maxFileSize, errorMsg }) => {
  const uploadFolder = path.join(__dirname, "..", "public", folderPath);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLocaleLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now() +
        fileExt;

      cb(null, fileName);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, file);
      } else {
        createError(errorMsg);
      }
    },
  });

  return upload;
};

module.exports = uploader;
