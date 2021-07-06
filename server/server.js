const app = require('express')();
const server = require('http').createServer(app);
const io = require("socket.io");
const expressApp = require('./expressApp');
const next = require("next");
const dotenv = require("dotenv");
const socket = require("./io/socket");

// environmental variables
dotenv.config({ path: `${__dirname}/../.env.local` });
 
// determine environment 
const dev = process.env.NODE_ENV !== "production";
  
// socket.io
socket(io(server, {cors: dev && {origin: 'http://localhost:3000'}})); 

// run only express server on development 
if (dev) {
  return expressApp(app, server, dev)
}

// run express with nextjs on production
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    // handle express requests 
    expressApp(app, server, dev);
    
     // // handle nextJs requests
    app.all("*", (req, res) => handle(req, res));
 
     // define port
  const PORT = process.env.PORT || 5000;

  // start app
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`app running on PORT ${PORT}`);
  });
           
  })
  .catch((err) => {
    console.log(`shutting down app on error`);
    console.log(err);
    process.exit(1);
  });   
         