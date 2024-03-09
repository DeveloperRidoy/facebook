const multer = require("multer");

// multer for videos
const multerForfiles = ({fileSize, types}) => {
    return multer({
    storage: multer.memoryStorage(),
    limits: fileSize,
    fileFilter: filter(types),
  });
};
 


module.exports = multerForfiles;

const filter = (types) => (req, file, cb) => {
  // check if file is correct format
  const exp = new RegExp(`^(${types.join('|')})`, "i");
  if (!exp.test(file.mimetype))
    return cb(new Error("filetype not supported"), false);

  return cb(null, true);
}; 