const sharp = require("sharp");
const AppError = require("../../AppError");
const { bytesToBase64 } = require('byte-base64');
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

      // make directory if does not exist 
      for (let key in req.files) {
         const fieldItem = fields.find((item) => item.name === key);
        // for multiple files
        if (fieldItem?.maxCount > 1 ) {
          req.body.photos = [];

          for (let i = 0; i < req.files[key].length; i++) {
            const file = req.files[key][i];
            const editedFile = sharp(file.buffer);

            if (resize) editedFile.resize(width, height);
            editedFile
              .toFormat("jpeg")
              .jpeg({ quality: 100 })
            const bufferedFile = await editedFile.toBuffer();
            
            if (error) break;
            req.body.photos.push({
              name: file.originalname,
              contentType: file.mimetype,
              dataUrl: `data:${file.mimetype};base64,${bytesToBase64(
                bufferedFile
              )}`,
            });
          }
        }

        // for single file
        if (fieldItem?.maxCount === 1) {
          const file = req.files[key][0];

          // set photo dimensions
          if (key === "photoFile") {
            height = 100;
            width = 100;
          }
          if (key === "coverPhotoFile") {
            height = 312;
            width = 820;
          }

          const editedFile = sharp(file.buffer);
          if (resize) editedFile.resize(width, height);
          editedFile
            .toFormat("jpeg")
            .jpeg({ quality: 100 })
          const bufferedFile = await editedFile.toBuffer();

          // add photo to request body 
          const fileName = key === 'coverPhotoFile' ? 'coverPhoto': 'photo';
          req.body[fileName] = {
            name: file.originalname,
            contentType: file.mimetype,
            dataUrl: `data:${file.mimetype};base64,${bytesToBase64(bufferedFile)}`
          };
        }
      }
    } catch (error) {
    if (error) return next(new AppError(500, error.message));
  }
};


module.exports = savePhotos;