const { ADMIN } = require('../../../../utils/server/variables');
const { authenticate, registerUser, loginUser, logoutUser, quickLogin } = require('../controllers/auth');
const {
  getAllUsers,
  deleteAllUsers,
  updateMe,
  getUserById,
  deleteUserById
} = require("../controllers/users");
const protect = require('../middlewares/protect');
const checkId = require('../middlewares/checkId');

const Router = require('express').Router();


Router.route('/')
    .get(getAllUsers())
    .delete(protect(ADMIN), deleteAllUsers())
    .patch(protect(), updateMe())

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
  

module.exports = Router;