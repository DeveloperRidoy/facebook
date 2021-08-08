const multer = require("multer");
const makeDir = require("../../../../../../utils/server/functions/makeDir");
const { v4 } = require('uuid');

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
    const dir = `public/${
      file.mimetype.startsWith("video")
        ? "video"
        : file.mimetype.startsWith("image") ? "img": ''
      }/users/${req.user.slug}-${req.user._id}`;
    
    await makeDir(dir);
    return cb(null, dir);
  },
  filename: (req, file, cb) => {
    const name = `${v4()}.${file.mimetype.split("/")[1]}`;
    const nameWithFolder = `${req.user.slug}-${req.user._id}/${name}`;

    // for videos 
    if (file.mimetype.startsWith('video')) {
       if (!req.body.videos) {
         req.body.videos = [];
         req.body.videos.push(nameWithFolder);
       } else {
         req.body.videos.push(nameWithFolder);
       }
    }

    // for images 
    if (file.mimetype.startsWith("image")) {
      if (!req.body.photos) {
        req.body.photos = [];
        req.body.photos.push(nameWithFolder);
      } else {
        req.body.photos.push(nameWithFolder);
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