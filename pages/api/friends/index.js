import nc from "next-connect";
import {
  deleteAllFriendRequests,
  getAllFriends,
} from "../../../server/handlers/friends";
import protect from "../../../server/middlewares/protect";
import ncConfig from "../../../utils/server/ncConfig";
import dbConnection from "../../../server/middlewares/dbConnection";

const handler = nc(ncConfig)
  .use(dbConnection, protect())
  .get(getAllFriends)
  .delete(deleteAllFriendRequests);

export default handler;
