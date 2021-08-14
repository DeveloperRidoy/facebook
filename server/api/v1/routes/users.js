const { ADMIN } = require('../../../../utils/server/variables');
const { authenticate, registerUser, loginUser, logoutUser, quickLogin } = require('../controllers/auth');
const {
  getAllUsers,
  deleteAllUsers,
  updateMe,
  getUserById,
  deleteUserById,
  getUserBySlug,
  getUsersByName,
} = require("../controllers/users");
const protect = require('../middlewares/protect');
const checkId = require('../middlewares/checkId');
const { uploadPhotos} = require('../middlewares/multer/multer');

const Router = require("express").Router();

Router.route("/")
  .get(getAllUsers())
  .delete(protect(), deleteAllUsers())
  .patch(
    protect(),
    uploadPhotos({
      fields: [
        { name: "photoFile", maxCount: 1 },
        { name: "coverPhotoFile", maxCount: 1 },
      ],
      fileSize: 5 * 1024 * 1024,
      resize: true
    }),
    updateMe()
  );

Router.route("/auth")
    .get(authenticate())

Router.route("/auth/signup")
    .post(registerUser());

Router.route('/auth/login')
    .post(loginUser())

Router.route('/auth/logout')
    .get(protect(), logoutUser())

Router.route('/auth/quick-login/:id')
    .get(checkId(), quickLogin())

Router.route('/:id')
    .all(checkId())
    .get(getUserById())
    .delete(deleteUserById())

Router.route("/name/:name")
    .get(getUsersByName());

Router.route("/slug/:slug")
    .get(getUserBySlug())

module.exports = Router;