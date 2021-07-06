const { getDocs, addDocs, deleteDocs } = require("./handlerFactory");
const Post = require("../../../mongoDb/models/Post");
const catchAsync = require("../../../../utils/server/functions/catchAsync");

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