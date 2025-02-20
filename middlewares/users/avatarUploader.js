const uploader = require("../../utils/singleUploader");

function avatarUploader(req, res, next) {
  const upload = uploader({
    folderPath: "avatars",
    allowedFileTypes: ["image/jpg", "image/jpeg", "image/png"],
    maxFileSize: 1000000,
    errorMsg: "Only .jpg, .jpeg or .png format is allowed.",
  });

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUploader;
