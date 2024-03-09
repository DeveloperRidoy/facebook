import multer from "multer";

const ncConfig = {
  onError: (err, req, res, next) => {
    console.log(err)

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }

    const code = err.code || 500;
    const status =
      code === 400
        ? "Bad Request"
        : code === 401
        ? "Unauthorized"
        : code === 404
        ? "Not Found"
        : "Fail";

    return res.status(code).json({
      status,
      message: code === 500 ? "server error":  err.message,
    });
  },
  onNoMatch: (req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: "Resource not found",
    });
  },
};

export default ncConfig;
