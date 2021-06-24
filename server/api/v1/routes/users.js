const Router = require('express').Router();


Router.route('/')
    .get((req, res, next) => {
        return res.json({users: 'these are the users'})
    })







module.exports = Router;