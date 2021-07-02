const express = require('express');
const cookieParser = require("cookie-parser");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const connectDb = require("./mongoDb/connectDb");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const error = require("./api/v1/middlewares/error");
const notFound = require("./api/v1/middlewares/notFound");
const cors = require("cors");

const expressApp = (app, server, dev) => {
  // implement cors in development
  if (dev) {
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));

    // cors for prefilght request of complex request like delete, patch etc
    app.options("*", cors({ origin: "http://localhost:3000", credentials: true }));
  }

  // trust proxy
  app.enable("trust proxy", 1);

  // http helmet
  app.use(helmet());

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
  app.use(cookieParser(process.env.COOKIE_SECRET)); 
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  // connect db
  connectDb();

  // api routes
  const routes = ["users"];

  // handle routes requests
  routes.forEach((route) =>
    app.use(`/api/v1/${route}`, require(`${__dirname}/api/v1/routes/${route}`))
  );

  // handle 404 requests
  app.all(/^\/api\/v1/, notFound);

  

  // handle error
  app.use(error);

  // do not start solo server on production 
  if (!dev) return;
 
  // define port
  const PORT = process.env.PORT || 5000;

  // start app
  const runningServer = server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`app running on PORT ${PORT}`);
  });

  // close server on unhandled rejection
  process.on("unhandledRejection", (err) => {
    console.log(err);
    console.log("unhandled rejection, φ(゜▽゜*)♪, shutting down server...");
    runningServer.close(() => process.exit(1));
  });

  // handling uncaught exceptions
  process.on("uncaughtException", (err) => {
    console.log(err);
    console.log("uncaught exception, φ(゜▽゜*)♪, shutting down server...");
    runningServer.close(() => process.exit(1));
  });

  // handling SIGTERM
  process.on("SIGTERM", () => {
    console.log("SIGTERM received. 👏 Shutting down gracefully.");
    runningServer.close(() => console.log("💥Process terminated"));
    // sigterm already stops the program..so no need to call process.exit.
  });
};

module.exports = expressApp;
