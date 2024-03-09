import catchAsync from "../../utils/server/catchAsync";
import AppError from "../../utils/server/AppError";
import User from "../models/User";
import Friend from "../models/Friend";
const {
  REQUESTED,
  PENDING,
  FRIENDS,
  ADD_FRIEND,
} = require("../../utils/global/variables");
const { getDocs } = require("../handlers/handlerFactory");


// request handler for all request
const handleFriendRequest = ({
  findStatus,
  handleStatus,
  isRequester = true,
  notFoundMsg,
  preventRequestLogicArr = [],
  successMsg,
  seen = true,
}) =>
  catchAsync(async (req, res, next) => {
    // check if sending request to own self
    if (String(req.query.id) === String(req.user._id))
      return next(new AppError(403, "not allowed"));

    // prevent duplicate request
    if (preventRequestLogicArr.length > 0) {
      const logicArr = [];
      preventRequestLogicArr.forEach((logic) =>
        logicArr.push({
          requester: logic.reverse ? req.query.id : req.user._id,
          recepient: logic.reverse ? req.user._id : req.query.id,
          status: logic.status,
        })
      );
      const alreadySent = await Friend.findOne({ $or: logicArr });
      if (alreadySent) return next(new AppError(403, "not authorized"));
    }

    // check if the recepient exists
    const recepientUser = await User.findById(req.query.id);
    if (!recepientUser) {
      // delete all friend docs containing this non-existence recepient
      await Friend.deleteMany({ requester: req.query.id });
      await Friend.deleteMany({ recepient: req.query.id });
      return next(new AppError(404, "user not found"));
    }

    //  check if request exists
    if (findStatus) {
      const friendRequest = await Friend.findOne({
        requester: req.user._id,
        recepient: req.query.id,
        status: findStatus,
      });
      if (!friendRequest) return next(new AppError(404, notFoundMsg));
    }

    // handle request
    await Friend.findOneAndUpdate(
      { requester: req.user._id, recepient: req.query.id },
      { $set: { status: handleStatus, seen } },
      { upsert: true, new: true }
    );

    await Friend.findOneAndUpdate(
      { requester: req.query.id, recepient: req.user._id },
      {
        $set: {
          status:
            handleStatus === REQUESTED
              ? PENDING
              : handleStatus === PENDING
              ? REQUESTED
              : handleStatus,
          seen,
        },
      },
      { upsert: true, new: true }
    );

    // return updated users
    const updatedUsers = await User.find({
      $or: [{ _id: req.user._id }, { _id: req.query.id }],
    }).populate({ path: "friends posts" });

    const requester = updatedUsers.find(
      (user) =>
        String(user._id) === String(isRequester ? req.user._id : req.query.id)
    );
    const recepient = updatedUsers.find(
      (user) =>
        String(user._id) === String(isRequester ? req.query.id : req.user._id)
    );

    return res.json({
      status: "success",
      message: successMsg,
      data: { requester, recepient },
    });
  });



// @route           GET api/friends
// @description     Get all friends
// @accessibllity   user
export const getAllFriends = getDocs(Friend);

// @route           POST api/friends/see/:id
// @description     Make friend request seen
// @accessibllity   user
export const seeFriendRequest = handleFriendRequest({
  findStatus: PENDING,
  handleStatus: PENDING,
  isRequester: false,
  notFoundMsg: "friend request not found",
  successMsg: "friend request seen",
  seen: true,
});

// @route           GET api/friends
// @description     Get all friends
// @accessibllity   user
export const deleteAllFriendRequests = catchAsync(async (req, res, next) => {
  await Friend.deleteMany({
    $or: [
      { recepient: req.user._id, status: REQUESTED },
      { requester: req.user._id, status: PENDING },
    ],
  });

  return res.json({
    status: "success",
    message: "all friend requests deleted",
  });
});

// @route           POST api/friends/:id
// @description     Send friend request
// @accessibllity   user
export const sendFriendRequest = handleFriendRequest({
  preventRequestLogicArr: [
    { status: REQUESTED },
    { reverse: true, PENDING },
    { status: PENDING },
    { reverse: true, status: REQUESTED },
    { status: FRIENDS },
  ],
  handleStatus: REQUESTED,
  preventRequestMsg: "already sent request",
  isRequester: true,
  notFoundMsg: "friend request not found",
  successMsg: "friend request sent",
  seen: false,
});

// @route           PATCH api/friends/:id
// @description     Accept friend request
// @accessibllity   user
export const acceptFriendRequest = handleFriendRequest({
  findStatus: PENDING,
  handleStatus: FRIENDS,
  isRequester: false,
  notFoundMsg: "friend request not found",
  successMsg: "friend request accepted",
});

// @route           DELETE api/friends/:id
// @description     cancel sent friend request
// @accessibllity   user
export const cancelFriendRequest = handleFriendRequest({
  findStatus: REQUESTED,
  handleStatus: ADD_FRIEND,
  isRequester: true,
  notFoundMsg: "friend request not found",
  successMsg: "friend request cancelled",
});

// @route           POST api/friends/decline/:id
// @description     decline friend request
// @accessibllity   user
export const declineFriendRequest = handleFriendRequest({
  findStatus: PENDING,
  handleStatus: ADD_FRIEND,
  isRequester: false,
  notFoundMsg: "friend request not found",
  successMsg: "friend request declined",
});



// @route           POST api/friends/unfriend/:id
// @description     unfriend a friend
// @accessibllity   user
export const unfriend = handleFriendRequest({
  findStatus: FRIENDS,
  handleStatus: ADD_FRIEND,
  isRequester: true,
  notFoundMsg: "users must be be friends first",
  successMsg: "unfriended user",
});

