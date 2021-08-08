const Router = require("express").Router();
const {
  getAllPosts,
  addPost,
  deleteAllPosts,
  addComment,
  addLike,
  removeLike,
  likeComment,
  unlikeComment,
  getPostById,
  getPostsByUserId,
  deletePostById,
} = require("../controllers/posts");
const protect = require("../middlewares/protect");
const checkId = require("../middlewares/checkId");
const { uploadFiles } = require("../middlewares/multer/multer");

Router.route("/")
  .get(getAllPosts())
  .post(
    protect(),
    uploadFiles({
      types: ['image', 'video'],
      fields: [
        { name: "video", maxCount: 10 },
        { name: "photo", maxCount: 10 },
      ],
      fileSize: 100 * 1024 * 1024,
    }),
    addPost()
  )
  .delete(protect(), deleteAllPosts());


// protect below routes
Router.use(protect())

Router.route("/:id")
  .all(checkId())
  .get(getPostById())
  .delete(deletePostById())
Router.route("/:id/comments")
  .all(checkId())
  .patch(addComment())

Router.route("/:id/comments/:commentId/like")
  .all(checkId())
  .post(likeComment())
  .delete(unlikeComment())
  
Router.route("/:id/like")
  .all(checkId())
  .patch(addLike())
  .delete(removeLike())
  
Router.route('/user/:id')
  .all(checkId())
  .get(getPostsByUserId())
  
module.exports = Router;
 