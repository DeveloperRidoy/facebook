const { authenticate, registerUser, loginUser, logoutUser } = require('../controllers/auth');
const { getAllUsers, deleteAllUsers, updateMe } = require('../controllers/users');
const protect = require('../middlewares/protect');

const Router = require('express').Router();


Router.route('/')
    .get(getAllUsers())
    .delete(protect(), deleteAllUsers())
    .patch(protect(), updateMe())

Router.route("/auth")
    .get(authenticate())

Router.route("/auth/signup")
    .post(registerUser());

Router.route('/auth/login')
    .post(loginUser())

Router.route('/auth/logout')
    .get(protect(), logoutUser())




module.exports = Router;