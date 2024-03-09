const mongoose = require("mongoose");
const { getDocById } = require("./handlerFactory");
const catchAsync = require("../../utils/server/catchAsync");
const AppError = require("../../utils/server/AppError");
import User from "../models/User";
import Chat from "../models/Chat";

// @route           POST api/chats
// @description     Send private chat message
// @accessibllity   user
export const sendPrivateChatMessage = catchAsync(async (req, res, next) => {
  // parse any data that is in json format
  try {
    for (let key in req.body) {
      if (typeof req.body[key] === "string")
        req.body[key] = JSON.parse(req.body[key]);
    }
  } catch (error) {}
  const { message, recepient, photos, videos } = req.body;

  // check if necessary data is provided
  if (!recepient) return next(new AppError(400, "recepient is required"));

  if (photos && !Array.isArray(photos))
    return next(new AppError(400, "photos must be an array of string"));

  if (videos && !Array.isArray(videos))
    return next(new AppError(400, "videos must be an array of string"));

  if (!message && !photos && !videos)
    return next(
      new AppError(400, "one of message, photos or videos field is required")
    );

  // check if recepient is valid
  if (!mongoose.isValidObjectId(recepient))
    return next(new AppError(400, "invalid recepient"));

  // check if sending message to own self
  if (String(req.user._id) === String(recepient))
    return next(new AppError(403, "can't send message to own self"));

  // check if recepient still exists
  const recepientUser = await User.findById(recepient);
  if (!recepientUser)
    return next(new AppError(404, "recepient user not found"));

  // get chatId from previous chat if exists
  const prevChat = await Chat.findOne({
    $or: [
      {
        is_group_message: false,
        sender: req.user._id,
        participants: { $in: [recepient] },
      },
      {
        is_group_message: false,
        sender: recepient,
        participants: { $in: [req.user._id] },
      },
    ],
  });

  // create chat doc
  const chat = await Chat.create({
    sender: req.user,
    message,
    chatId: prevChat?.chatId || mongoose.Types.ObjectId(),
    participants: [recepientUser],
    photos,
    videos,
  });

  return res.json({
    status: "success",
    message: "message sent",
    data: { chat },
  });
});

// @route           GET api/chats/my-chats
// @description     Get user's all chats
// @accessibllity   user
export const getUserChats = catchAsync(async (req, res, next) => {
  let { from, to } = req.query;
  if (!from) from = 1;
  if (!to) to = 20;
  if (from < 1 || to < 1)
    return next(
      new AppError(400, "value of query 'from' and 'to' must be atleast 1")
    );
  if (from > to)
    return next(
      new AppError(
        400,
        "value of 'from' cannot be greater than the value of 'to'"
      )
    );

  const chats = await Chat.aggregate([
    {
      $match: {
        $or: [
          { sender: req.user._id },
          { participants: { $in: [req.user._id] } },
        ],
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        from: "users",
        as: "sender",
        let: { sender: "$sender" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$sender"] } } },
          {
            $project: {
              firstName: 1,
              fullName: 1,
              email: 1,
              photo: 1,
              slug: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$sender",
    },
    {
      $lookup: {
        from: "users",
        as: "participants",
        let: { participants: "$participants" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$participants"] } } },
          {
            $project: {
              firstName: 1,
              fullName: 1,
              email: 1,
              photo: 1,
              slug: 1,
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: { chatId: "$chatId", is_group_message: "$is_group_message" },
        docs: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        docs: { $slice: ["$docs", Number(from) - 1, Number(to)] },
      },
    },
  ]);

  return res.json({
    status: "success",
    results: chats.length,
    data: { chats },
  });
});

// @route           PATCH api/chats/seen
// @description     mark messages as seen
// @accessibllity   user
export const seeMessages = catchAsync(async (req, res, next) => {
  const { ids } = req.body;
  // check if ids are provided
  if (!ids || !Array.isArray(ids))
    return next(
      new AppError(400, "please provide ids field containing chat ids")
    );

  // check if all ids are valid
  for (let index in ids) {
    if (!mongoose.isValidObjectId(ids[index]))
      return next(
        new AppError(400, `invalid id(${ids[index]}) at position ${index}`)
      );
  }

  // make request
  const chats = await Chat.updateMany(
    {
      _id: { $in: ids },
      participants: { $in: [req.user._id] },
      readBy: { $nin: [req.user._id] },
    },
    { $push: { readBy: req.user._id } }
  );

  const updatedChats = await Chat.find({
    _id: { $in: ids },
    participants: { $in: [req.user._id] },
  });

  return res.json({
    status: "success",
    results: updatedChats.length,
    data: { chats: updatedChats },
  });
});

// @route           GET api/chats/:id
// @description     Get message by id
// @accessibllity   user
export const getMessageById = getDocById(Chat);

// free hole eta dekhien...

// https://facebook-5130.herokuapp.com

// photo shoho post kora jay..video upload option o disilam..but heroku free tier e possible na
// facebook er moto friend request patano jay..
// realtime notifications and messaging with socket.io
