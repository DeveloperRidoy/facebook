const saveFiles = (req) => {
    req.body.photos = [];
    req.body.videos = [];
    
    for (let key in req.files) {
        if (key === "photo") {
          req.files[key].forEach((file) =>
            req.body.photos.push({
              name: file.originalname,
              contentType: file.mimetype,
              dataUrl: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            })
          );
        }
    }
}


module.exports = saveFiles;