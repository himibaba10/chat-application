const fs = require("fs");
const path = require("path");

const removeAvatar = (fileName) => {
  if (!fileName) return;
  fs.unlink(
    path.join(process.cwd(), `/public/uploads/avatars/${fileName}`),
    (err) => {
      if (err) console.log(err);
    }
  );
};

module.exports = removeAvatar;
