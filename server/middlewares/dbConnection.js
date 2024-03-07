import catchAsync from "../../utils/server/catchAsync";
import connectDb from "../../utils/server/connectDb";

const dbConnection = catchAsync(async (req, res, next) => {
  await connectDb();
  return next();
});

export default dbConnection;
