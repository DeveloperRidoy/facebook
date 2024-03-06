import multer from "multer";

const ncConfig = {
  onError: (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "fail",
      message: "Server error",
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
