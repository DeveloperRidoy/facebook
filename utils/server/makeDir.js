const fs = require("fs");



const makeDir = (dir) => new Promise((resolve, reject) => {
    try {
      const dirExists = fs.existsSync(dir);
      if (dirExists) return resolve();

        fs.mkdirSync(dir, { recursive: true })
        
        return resolve();
    } catch (error) {
        return reject(error.message);
    }
 
})

module.exports = makeDir;