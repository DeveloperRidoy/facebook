const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");
const User = require('../../../mongoDb/models/User');
const Friend = require('../../../mongoDb/models/Friend');
const { REQUESTED, PENDING, FRIENDS, ADD_FRIEND } = require("../../../../utils/global/variables");
const { getDocs } = require('../controllers/handlerFactory');

// @route           GET api/v1/friends
// @description     Get all friends 
// @accessibllity   user
exports.getAllFriends = () => getDocs(Friend)

// @route           POST api/v1/friends/see/:id 
// @description     Make friend request seen 
// @accessibllity   user 
exports.seeFriendRequest = () =>
  handleFriendRequest({
    findStatus: PENDING,
    handleStatus: PENDING,
    isRequester: false,
    notFoundMsg: "friend request not found",
    successMsg: "friend request seen",
    seen: true
  });


// @route           GET api/v1/friends
// @description     Get all friends 
// @accessibllity   user
exports.deleteAllFriendRequests = () => catchAsync(async (req, res, next) => {
  await Friend.deleteMany({
    $or: [
      { recepient: req.user._id, status: REQUESTED },
      { requester: req.user._id, status: PENDING },
    ],
  }); 

  return res.json({
    status: 'success', 
    message: 'all friend requests deleted'
  })
})


// @route           POST api/v1/friends/:id
// @description     Send friend request
// @accessibllity   user
exports.sendFriendRequest = () =>
  handleFriendRequest({
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
    seen: false
  });


// @route           PATCH api/v1/friends/:id
// @description     Accept friend request
// @accessibllity   user
exports.acceptFriendRequest = () =>
  handleFriendRequest({
    findStatus: PENDING,
    handleStatus: FRIENDS,
    isRequester: false,
    notFoundMsg: "friend request not found",
    successMsg: "friend request accepted",
  });


// @route           DELETE api/v1/friends/:id
// @description     cancel sent friend request
// @accessibllity   user
exports.cancelFriendRequest = () => handleFriendRequest({
  findStatus: REQUESTED,
  handleStatus: ADD_FRIEND,
  isRequester: true,
  notFoundMsg: "friend request not found",
  successMsg: "friend request cancelled"
})


// @route           POST api/v1/friends/decline/:id
// @description     decline friend request 
// @accessibllity   user 
exports.declineFriendRequest = () =>
  handleFriendRequest({
    findStatus: PENDING,
    handleStatus: ADD_FRIEND,
    isRequester: false,
    notFoundMsg: "friend request not found",
    successMsg: "friend request declined",
  });



// @route           POST api/v1/friends/unfriend/:id
// @description     unfriend a friend
// @accessibllity   user
exports.unfriend = () => handleFriendRequest({
  findStatus: FRIENDS,
  handleStatus: ADD_FRIEND,
  isRequester: true,
  notFoundMsg: "users must be be friends first",
  successMsg: "unfriended user",
})


// request handler for all request
const handleFriendRequest = ({findStatus, handleStatus, isRequester = true, notFoundMsg, preventRequestLogicArr = [],  successMsg, seen = true}) =>
  catchAsync(async (req, res, next) => {
    
    // check if sending request to own self
    if (String(req.params.id) === String(req.user._id))
      return next(new AppError(403, "not allowed"));
  
    // prevent duplicate request
    if (preventRequestLogicArr.length > 0) {
      
      const logicArr = [];
      preventRequestLogicArr.forEach((logic) =>
        logicArr.push({
          requester: logic.reverse ? req.params.id : req.user._id,
          recepient: logic.reverse ? req.user._id : req.params.id,
          status: logic.status,
        })
      );
      const alreadySent = await Friend.findOne({ $or: logicArr });
      if (alreadySent) return next(new AppError(403, "not authorized"));
    }
    
    // check if the recepient exists 
    const recepientUser = await User.findById(req.params.id);
    if (!recepientUser) {
      // delete all friend docs containing this non-existence recepient 
      await Friend.deleteMany({ requester: req.params.id });
      await Friend.deleteMany({ recepient: req.params.id });
      return next(new AppError(404, 'user not found'))
    }
 
    //  check if request exists
   if(findStatus) {  
     const friendRequest = await Friend.findOne({
       requester: req.user._id,
       recepient: req.params.id,
       status: findStatus,
     });
     if (!friendRequest) return next(new AppError(404, notFoundMsg));
   }

    // handle request
    await Friend.findOneAndUpdate(
      { requester: req.user._id, recepient: req.params.id },
      { $set: { status: handleStatus, seen} },
      { upsert: true, new: true }
    );


    await Friend.findOneAndUpdate(
      { requester: req.params.id, recepient: req.user._id },
      { $set: { status: handleStatus === REQUESTED ? PENDING: handleStatus === PENDING ? REQUESTED: handleStatus, seen} },
      { upsert: true, new: true }
    );

   
    // return updated users
    const updatedUsers = await User.find({
      $or: [{ _id: req.user._id }, { _id: req.params.id }],
    }).populate({ path: "friends posts" });

    const requester = updatedUsers.find(
      (user) =>
        String(user._id) === String(isRequester ? req.user._id : req.params.id)
    );
    const recepient = updatedUsers.find(
      (user) =>
        String(user._id) === String(isRequester ? req.params.id : req.user._id)
    );

    return res.json({
      status: "success",
      message: successMsg,
      data: { requester, recepient },
    });
  });