const Router = require("express").Router();
const { ADMIN, USER } = require("../../../../utils/server/variables");
const { getAllPosts, addPost, deleteAllPosts} = require("../controllers/posts");
const protect = require("../middlewares/protect");

Router.route("/")
  .get(getAllPosts())
  .post(protect(), addPost())
  .delete(protect(), deleteAllPosts())
//   .delete(protect(), deleteAllUsers())
//   .patch(protect(), updateMe());


module.exports = Router;
 