import catchAsync from "../../utils/server/catchAsync";
import connectDb from "../../utils/server/connectDb";
import "../models/Chat";
import "../models/Friend";
import "../models/Post";
import "../models/User";

const dbConnection = catchAsync(async (req, res, next) => {
  await connectDb();
  return next();
});

export default dbConnection;
