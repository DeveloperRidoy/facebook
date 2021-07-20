const multer = require('multer');
const AppError = require('./AppError');
const fs = require('fs');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const limits = { fileSize: 3 * 1024 * 1024 };
const fileFilter = (req, file, cb) => {

    // check if file is correct format 
   if (!file.mimetype.startsWith("image"))
    return cb(new Error("Not an image"), false);
  
  return cb(null, true);
}

const upload = multer({ storage, limits, fileFilter});

// single upload
exports.uploadSinglePhoto = () => (req, res, next) =>
  upload.fields([
    { name: "photoFile", maxCount: 1 },
    { name: "coverPhotoFile", maxCount: 1 },
  ])(req, res, (err) => {
    // handle multer validation error
    if (err instanceof multer.MulterError)
      return next(new AppError(400, err.message));

    // go to next middleware
    next();
  });


// resize photo 
exports.resizePhoto = (height = 100, width = 100) => async (req, res, next) => {
  try {
     // check if there is file
    if (!req.files) return next();


    // create folder if does not exist
    const folder = `${req.user.firstName}-${req.user._id}`;
    if (!fs.existsSync(`public/img/users/${folder}`)) {
      await fs.mkdir(`public/img/users/${folder}`, (err) => {
        if (err) return next(new AppError(500, err.message));
      });
    }

    Object.keys(req.files).forEach(async (key) => {
      const name = `${req.user._id}-${Date.now()}${
        key === "coverPhotoFile" ? "-cover" : ""
      }.jpeg`;

      // set photo
      if (key === "photoFile") {
        req.body.photo = `${folder}/${name}`;
        height = 100;
        width = 100;
      }
      if (key === "coverPhotoFile") {
        req.body.coverPhoto = `${folder}/${name}`;
         height = 312;
         width = 820;
      }



      // resize and convert to jpeg
      await sharp(req.files[key][0].buffer)
        .resize(width, height)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/img/users/${`${folder}/${name}`}`, (err) => {
          if (err) return next(new AppError(500, error.message));
        });
    });

    // go to next middleware
    return next();
  } catch (error) {
    if(error) return next(new AppError(500, error.message))
  }
}