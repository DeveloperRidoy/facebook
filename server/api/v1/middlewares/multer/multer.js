const multer = require('multer');
const AppError = require('../AppError');
const multerForImages = require('./functions/multerForImages');
const multerForFiles = require('./functions/multerForFiles');
const savePhotos = require('./functions/savePhotos');
const catchAsync = require('../../../../../utils/server/functions/catchAsync');
const { cloneDeep } = require('lodash');


// photo upload
exports.uploadPhotos = ({
  fields = [],
  resize = false,
  height = 100,
  width = 100,
  fileSize = 5 * 1024 * 1024,
}) => 
  catchAsync(async (req, res, next) => {
    multerForImages(fileSize).fields(fields)(req, res, async (err) => { 
      // see if there are files to upload 
      if (!req.files) return next();
      if (Object.keys(req.files)?.length === 0) return next();
      // handle multer validation error
      if (err instanceof multer.MulterError)
        return next(new AppError(400, err.message));

      // edit and save photos to storage
      await savePhotos({ resize, height, width, fields, req, res, next });
      // go to next middleware 
      next();
    });
  }
    
  );

// video upload 
exports.uploadFiles = ({ fileSize = 5 * 1024 * 1024, fields = [], types = [] }) =>
  catchAsync(async (req, res, next) => {
    multerForFiles({fileSize, types}).fields(fields)(req, res, (err) => {
      // see if there are files to upload
      if (req.files && Object.keys(req.files)?.length === 0) return next();
      
      // handle multer validation error
      if (err instanceof multer.MulterError)
        return next(new AppError(400, err.message));
      
      
      // go to next middleware
      next();
    });
  });
             