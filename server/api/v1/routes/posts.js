const Router = require("express").Router();
const { ADMIN, USER } = require("../../../../utils/server/variables");
const {
  getAllPosts,
  addPost,
  deleteAllPosts,
  addComment,
} = require("../controllers/posts");
const protect = require("../middlewares/protect");
const checkId = require("../middlewares/checkId")

Router.route("/")
  .get(getAllPosts())
  .post(protect(), addPost())
  .delete(protect(), deleteAllPosts())


// protect below routes
Router.use(protect())

Router.route("/:id")
  .all(checkId())

Router.route("/:id/comment")
  .all(checkId())
  .post(addComment())

module.exports = Router;
 