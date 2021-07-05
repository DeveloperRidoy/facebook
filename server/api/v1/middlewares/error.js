

const error = (err, req, res, next) => {
  console.log(err);

  // catch syntax error
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // catch other errors
  return res.status(err.code).json({
    status: "fail",
    message: err.code === 500 ? "server error" : err.message,
  });
};

module.exports = error;
