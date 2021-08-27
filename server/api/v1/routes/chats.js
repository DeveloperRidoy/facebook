const Router = require('express').Router(); 
const {
  sendPrivateChatMessage,
  getUserChats,
  seeMessages,
  getMessageById,
} = require("../controllers/chats");
const checkId = require('../middlewares/checkId');
const { uploadFiles } = require('../middlewares/multer/multer');
const protect = require('../middlewares/protect');



Router.use(protect());
 
Router.route("/").post(
  uploadFiles({
    types: ["image", "video"],
    fields: [
      { name: "photo", maxCount: 10 },
    ],
    fileSize: 100 * 1024 * 1024,
  }),
  sendPrivateChatMessage()
)

Router.route("/seen").patch(seeMessages());

Router.route("/my-chats").get(getUserChats());

Router.route('/:id')
  .all(checkId())
  .get(getMessageById())










module.exports = Router;