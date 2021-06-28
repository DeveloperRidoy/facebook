const { getAllUsers } = require('../controllers/users');

const Router = require('express').Router();


Router.route('/')
    .get(getAllUsers())







module.exports = Router;