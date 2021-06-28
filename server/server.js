const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const next = require("next");
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

// environmental variables
dotenv.config({ path: `${__dirname}/.env.local` });

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
      
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
    if (process.env.NODE_ENV !== "production") {
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

    // handle GET requests nextJs
    app.get("*", (req, res) => handle(req, res));

    // handle POST request nextJs
    app.post('/api/auth/*', (req, res) => handle(req, res));

    // define port
    const PORT = process.env.PORT || 3000;

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
