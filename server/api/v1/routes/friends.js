const {
  sendFriendRequest,
  acceptFriendRequest,
  getAllFriends,
  cancelFriendRequest,
  unfriend,
  declineFriendRequest,
  deleteAllFriendRequests,
  seeFriendRequest,
} = require("../controllers/friends");
const protect = require("../middlewares/protect");
const Router = require("express").Router();
const checkId = require('../middlewares/checkId');

Router.use(protect())

Router.route('/')
    .get(getAllFriends())
    .delete(deleteAllFriendRequests())

Router.route("/:id")
  .all(checkId())
  .post(sendFriendRequest())
  .patch(acceptFriendRequest())
  .delete(cancelFriendRequest());

Router.route("/decline/:id")
  .all(checkId())
  .post(declineFriendRequest())

Router.route("/see/:id").all(checkId()).post(seeFriendRequest());

Router.route("/unfriend/:id")
  .all(checkId())
  .post(unfriend())


module.exports = Router;