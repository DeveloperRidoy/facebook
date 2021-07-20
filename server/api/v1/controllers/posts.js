const { getDocs, addDocs, deleteDocs } = require("./handlerFactory");
const Post = require("../../../mongoDb/models/Post");
const catchAsync = require("../../../../utils/server/functions/catchAsync");
const AppError = require("../middlewares/AppError");

// @route           GET api/v1/posts
// @description     get all posts
// @accessibllity   public
exports.getAllPosts = () => getDocs(Post);

// @route           POST api/v1/posts
// @description     Add a post
// @accessibllity   user 
exports.addPost = () => catchAsync(async (req, res, next) => {
    const post = await Post.create({ user: req.user._id, ...req.body });
    return res.json({
        status: 'success',
        message: 'post added',
        data: {post}
     })
})

// @route           DELETE api/v1/posts
// @description     delete all posts
// @accessibllity   admin
exports.deleteAllPosts = () => deleteDocs(Post);

// @route           POST api/v1/posts/:id/comment 
// @description     comment on a post
// @accessibllity   user 
exports.addComment = () => catchAsync(async (req, res, next) => {
    // check if post exists; 
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError(404, 'post not found'));
    
    // prevent manually adding user id to request 
    if (req.body.user) return next(new AppError(403, 'unauthorized'));

    const replies = req.body.replies?.map(reply => {
        reply.user = req.user;
        reply.replies = reply.replies?.map(reply => {
            reply.user = req.user;
            return reply;
        }) || []

        return reply;
    }) || []
    const comment = {text: req.body.text, user: req.user._id, replies}

    post.comments.push(comment);
    await post.save();

    return res.json({
        status: 'success',
        message: 'comment added',
        data: {post}
    })

 })