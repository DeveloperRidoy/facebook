const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const next = require("next");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require('helmet');
const xss = require('xss-clean');
const socket = require("./io/socket");
const connectDb = require("./mongoDb/connectDb");
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const error = require("./utils/functions/error");
const cors = require('cors');

// environmental variables
dotenv.config({ path: `${__dirname}/../.env.local` });
const dev = process.env.NODE_ENV !== "production";
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();
 
// nextApp
//   .prepare()
//   .then(() => {
    
    // implement cors 
    app.use(cors());

      // cors for prefilght request of complex request like delete, patch etc
      app.options('*', cors());

    // trust proxy
    app.enable("trust proxy", 1);

    // http helmet 
    app.use(helmet())
    
    // http parameter pollution 
    app.use(hpp());

    // mongo sanitize
    app.use(mongoSanitize());

    // cross site scripting 
    app.use(xss());
      
    // show api requests info in development mode
    if (dev) {
      app.use(morgan("combined"));
    }

    // compress response
    app.use(compression());

    // body parser, cookie parser, urlencoding
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true, limit: "10kb" }));

    // socket.io
    socket(io);

    // connect db 
    connectDb();

    // api routes 
    const routes = ['users']

    // handle routes requests 
    routes.forEach(route => app.use(`/api/v1/${route}`, require(`${__dirname}/api/v1/routes/${route}`)))

    // // handle GET requests to nextJs
    // app.get("*", (req, res) => handle(req, res));

    // // handle POST request to nextJs
    // app.post('/api/auth/*', (req, res) => handle(req, res));

    // handle error 
    app.use(error)

    // define port
    const PORT = process.env.PORT || 5000;

    // start app
    const runningServer = server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`app running on PORT ${PORT}`);
    });
    
// close server on unhandled rejection
process.on('unhandledRejection', (err) => { 
  console.log(err);
  console.log('unhandled rejection, φ(゜▽゜*)♪, shutting down server...');
  server.close(() => process.exit(1))
})

// handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(err);
  console.log("uncaught exception, φ(゜▽゜*)♪, shutting down server...");
  runningServer.close(() => process.exit(1)); 
});


// handling SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM received. 👏 Shutting down gracefully.');
  server.close(() => console.log('💥Process terminated'));
  // sigterm already stops the program..so no need to call process.exit.
})
  // })
  // .catch((err) => {
  //   console.log(`shutting down app on error`);
  //   console.log(err);
  //   process.exit(1);
  // });
