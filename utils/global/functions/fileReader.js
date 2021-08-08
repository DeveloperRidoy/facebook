
const Reader = class {
  constructor (file) {
    this.file = file;
    this.reader = new FileReader(); 
  }

  getUrl = () => new Promise((resolve, reject) => {
    try {
       this.reader.readAsDataURL(this.file);
       this.reader.onloadend = (ev) => resolve(ev.target.result);
    } catch (error) {
      reject(error);
    }   
  })    
}


module.exports = Reader;