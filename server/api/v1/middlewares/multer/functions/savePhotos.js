const makeDir = require("../../../../../../utils/server/functions/makeDir");
const sharp = require("sharp");
const AppError = require("../../AppError");
const { v4 } = require('uuid');

// edit and save photos via sharp
const savePhotos = async ({
  resize = false,
  height,
  width,
  fields,
  req,
  res,
  next,
}) => {
    try {
      let error = false;
      // check if there is file
      if (!req.files) return next();

      for (let key in req.files) {
        // create folder if does not exist
        const folder = `${req.user.slug}-${req.user._id}`;
        await makeDir(`public/img/users/${folder}`);

         const fieldItem = fields.find((item) => item.name === key);
        // for multiple files
        if (fieldItem?.maxCount > 1 ) {
          req.body.photos = [];

          for (let i = 0; i < req.files[key].length; i++) {
            const name = `${v4()}.jpeg`;

            const file = sharp(req.files[key][i].buffer);

            if (resize) file.resize(width, height);
            file
              .toFormat("jpeg")
              .jpeg({ quality: 100 })
              .toFile(`public/img/users/${`${folder}/${name}`}`, (err) => {
                if (err) {
                  error = true;
                  return next(new AppError(400, err.message));
                }
              });
            if (error) break;
            req.body.photos.push(`${folder}/${name}`);
          }
        }

        // for single file
        if (fieldItem?.maxCount === 1) {
          const name = `${v4()}${
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

          const file = sharp(req.files[key][0].buffer);
          if (resize) file.resize(width, height);
          file
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
            .toFile(`public/img/users/${`${folder}/${name}`}`, (err) => {
              if (err) {
                return next(new AppError(500, error.message));
              }
            });
        }
      }
    } catch (error) {
    if (error) return next(new AppError(500, error.message));
  }
};


module.exports = savePhotos;