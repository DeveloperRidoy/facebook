const Router = require("express").Router();
const {
  addLogin,
  getAllLogins,
  deleteAllLogins,
  updateLogin,
  quickLoginAuth,
  deleteQuickLogin,
} = require("../controllers/quick-logins");
const checkId = require("../middlewares/checkId");
const protect = require("../middlewares/protect");

Router.route('/')
  .get(getAllLogins())
  .post(protect(), addLogin())
  .delete(deleteAllLogins())


Router.route('/:id')
  .all(checkId())
  .patch(updateLogin())
  .get(quickLoginAuth())
  .delete(deleteQuickLogin())
module.exports = Router;