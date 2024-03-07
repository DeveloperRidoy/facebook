const multer = require('multer');

// multer for images
const multerForImages = (imageFileSize) =>
  multer({
    storage: multer.memoryStorage(),
    limits: imageFileSize,
    fileFilter: filter("image"),
  });

const filter = (type) => (req, file, cb) => {
  // check if file is correct format
  const exp = new RegExp(`^(${type})`, "i");
  if (!exp.test(file.mimetype))
    return cb(new Error("filetype not supported"), false);

  return cb(null, true);
};

module.exports = multerForImages;
