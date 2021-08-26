const { getDocs, addDocs, deleteDocs, getDocById } = require("./handlerFactory");
const Post = require("../../../mongoDb/models/Post");
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");
const {
  COMMENT,
  REPLY,
} = require("../../../../utils/global/variables");
const User = require("../../../mongoDb/models/User");

// @route           GET api/v1/posts
// @description     get all posts
// @accessibllity   public
exports.getAllPosts = () => getDocs(Post);

// @route           GET api/v1/posts/:id
// @description     get post by id 
// @accessibllity   user
exports.getPostById = () => getDocById(Post)

// @route           DELETE api/v1/posts/:id
// @description     delete post by id 
// @accessibllity   user
exports.deletePostById = () => catchAsync(async (req, res, next) => {
  // check if post exists 
  const post = await Post.findById(req.params.id);
  if (!post) return next(new AppError(400, 'post not found'));
  
  // check if user posted the post 
  const owner = String(post.user._id) === String(req.user._id);
  if (!owner) return next(new AppError(400, "not authorized"));
  
  // delete post 
  await post.delete()
  return res.json({
    status: "success",
    message: "post deleted",
  });
});

// @route           GET api/v1/posts/user/:id
// @description     get posts by user id 
// @accessibllity   user
exports.getPostsByUserId = () => catchAsync(async (req, res, next) => {
  const posts = await Post.find({user: {_id: req.params.id} });
  return res.json({
    status: "success",
    results: posts.length,
    data: { posts },
  });
});

      
    // @route           POST api/v1/posts
    // @description     Add a post
    // @accessibllity   user        
    exports.addPost = () => 
      catchAsync(async (req, res, next) => {
        try {
          for (let key in req.body) {
            if (typeof req.body[key] === "string")
              req.body[key] = JSON.parse(req.body[key]);
          }
        } catch (error) { }

        const post = await Post.create({ user: req.user, ...req.body });
        return res.json({
          status: "success",
          message: "post added",    
          data: { post },
        });
      })
  ;

// @route           DELETE api/v1/posts
// @description     delete all posts
// @accessibllity   admin
exports.deleteAllPosts = () => deleteDocs(Post);

// @route           PATCH api/v1/posts/:id/comment
// @description     comment on a post
// @accessibllity   user
exports.addComment = () =>
  catchAsync(async (req, res, next) => {
    // data
    let { text, type, replyTo, replyCommentId, mension } = req.body;
  
    // prevent manually adding user id to request
    if (req.body.user) return next(new AppError(403, "unauthorized"));

    // check type
    if (type !== COMMENT && type !== REPLY)
      return next(
        new AppError(
          400,
          `comment must be one of these types ['${COMMENT}', '${REPLY}']`
        )
      );

    // check if post exists;
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError(404, "post not found"));

    // for comment
    if (type === COMMENT) {
      replyTo = undefined;
      replyCommentId = undefined;
      mension = undefined;
      post.comments.push({
        type: type || COMMENT,
        text,
        user: req.user,
        mension,
      });
    }

    // for replies
    if (type === REPLY) {
      // check if replyTo is provided
      if (!replyTo)
        return next(new AppError(400, "please provide replyTo field"));

      // check if replyCommentId is provided
      if (!replyCommentId)
        return next(new AppError(400, "please provide replyCommentId field"));

      // check if replyCommentId is valid
      if (replyCommentId.length !== 24)
        return next(new AppError(400, "invalid replyCommentId value"));

      // check if there is a commnet to actually reply to
      const comment = post.comments?.find(
        (comment) => String(comment._id) === String(replyCommentId)
      );
      if (!comment)
        return next(new AppError(404, "there is no such comment to reply to "));

      // check if the comment is by the desired user
      if (
        String(comment.user._id) !== String(replyTo._id) &&
        String(comment.user._id) !== String(replyTo)
      )
        return next(
          new AppError(404, "there is no such comment to reply to 2")
        );

      const mensionedUser = mension?._id
        ? await User.findById(mension._id)
        : mension ? await User.findById(mension)
        : ''
        
      if(mension && !mensionedUser) next(new AppError(404, "user not found"));

      // update post
      const data = {
        text,
        user: req.user,
        type: type,
        replyTo,
        replyCommentId,
        mension: mensionedUser,
      };
      if (!mension) delete data.mension;
      post.comments.push(data);
    }

    await post.save();

    return res.json({
      status: "success",
      message: "comment added",
      data: { post },
    });
  });

// @route           PATCH api/v1/posts/:id/like
// @description     like a post
// @accessibllity   user
exports.addLike = () =>
  catchAsync(async (req, res, next) => {
    // check if post exists;
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError(404, "post not found"));

    // check if user previously liked the post
    const likedPost = post.likes.find(
      (item) => String(item.user) === String(req.user._id)
    );
    if (likedPost) return next(new AppError(400, "already liked post"));

    // add like
    post.likes.push({ user: req.user });
    await post.save();

    return res.json({
      status: "success",
      message: "like added",
      data: { post },
    });
  });

// @route           DELETE api/v1/posts/:id/like
// @description     remove like from post
// @accessibllity   user
exports.removeLike = () =>
  catchAsync(async (req, res, next) => {
    // check if post exists;
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError(404, "post not found"));

    // check if user previously liked the post
    const like = post.likes.find(
      (item) => String(item.user._id) === String(req.user._id)
    );
    if (!like) return next(new AppError(400, "not liked the post yet"));

    // remove like
    post.likes = post.likes.filter(
      (item) => String(item.user._id) !== String(req.user._id)
    );
    await post.save();

    return res.json({
      status: "success",
      message: "like added",
      data: { post },
    });
  });

// @route           POST api/v1/posts/:id/comments/:commentId/like
// @description     like a comment in a post
// @accessibllity   user
exports.likeComment = () =>
  catchAsync(async (req, res, next) => {
    // check if commentId is valid
    if (req.params.commentId.length !== 24)
      return next(new AppError(400, "invalid commendId"));

    // check if post exists;
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError(404, "post not found"));

    // check if comment exist
    const commentIndex = post.comments.findIndex(
      (comment) => String(comment._id) === String(req.params.commentId)
    );
    if (commentIndex === -1)
      return next(new AppError(404, "comment not found"));

    // check if already liked the comment
    const liked = post.comments[commentIndex].likes.find(
      (like) => String(like.user._id) === String(req.user._id)
    );
    if (liked) return next(new AppError(400, "already liked the comment"));

    // like the comment
    post.comments[commentIndex].likes.push({ user: req.user });
    await post.save();

    return res.json({
      status: "success",
      message: "liked the comment",
      data: { post },
    });
  });

// @route           DELETE api/v1/posts/:id/comments/:commentId/like
// @description     unlike a comment in a post
// @accessibllity   user
exports.unlikeComment = () =>
  catchAsync(async (req, res, next) => {
    // check if commentId is valid
    if (req.params.commentId.length !== 24)
      return next(new AppError(400, "invalid commendId"));

    // check if post exists;
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError(404, "post not found"));

    // check if comment exist
    const commentIndex = post.comments.findIndex(
      (comment) => String(comment._id) === String(req.params.commentId)
    );
    if (commentIndex === -1)
      return next(new AppError(404, "comment not found"));

    // check if already liked the comment
    const liked = post.comments[commentIndex].likes.find(
      (like) => String(like.user._id) === String(req.user._id)
    );
    if (!liked) return next(new AppError(400, "haven't liked the comment yet"));

    // unlike the comment
    post.comments[commentIndex].likes = post.comments[
      commentIndex
    ].likes.filter((item) => String(item.user._id) !== String(req.user._id));
    await post.save();

    return res.json({
      status: "success",
      message: "liked the comment",
      data: { post },
    });
  });


