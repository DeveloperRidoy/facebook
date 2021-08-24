const multer = require("multer");
const { v4 } = require('uuid');
const makeDir = require("../../../../../../utils/server/functions/makeDir");

// multer for videos
const multerForfiles = ({fileSize, types}) => {
    return multer({
    storage,
    limits: fileSize,
    fileFilter: filter(types),
  });
};
 


module.exports = multerForfiles;

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = file.mimetype.startsWith('image') ? 'public/img/users' : 'public/video/users';
    await makeDir(dir);
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const name = `${v4()}.${file.mimetype.split("/")[1]}`;

    // for videos 
    if (file.mimetype.startsWith('video')) {
       if (!req.body.videos) {
         req.body.videos = [];
         req.body.videos.push(name);
       } else {
         req.body.videos.push(name);
       }
    }

    // for images 
    if (file.mimetype.startsWith("image")) {
      if (!req.body.photos) {
        req.body.photos = [];
        req.body.photos.push(name);
      } else {
        req.body.photos.push(name);
      }
    }

    return cb(null, name);
  },
});

const filter = (types) => (req, file, cb) => {
  // check if file is correct format
  const exp = new RegExp(`^(${types.join('|')})`, "i");
  if (!exp.test(file.mimetype))
    return cb(new Error("filetype not supported"), false);

  return cb(null, true);
}; 