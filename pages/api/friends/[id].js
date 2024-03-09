import nc from "next-connect";
import checkId from "../../../server/middlewares/checkId";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  sendFriendRequest,
} from "../../../server/handlers/friends";
import protect from "../../../server/middlewares/protect";
import ncConfig from "../../../utils/server/ncConfig";
import dbConnection from "../../../server/middlewares/dbConnection";

const handler = nc(ncConfig)
  .use(dbConnection, protect(), checkId())
  .post(sendFriendRequest)
  .patch(acceptFriendRequest)
  .delete(cancelFriendRequest);

export default handler;
