import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import protect from "../../../../server/middlewares/protect";
import checkId from "../../../../server/middlewares/checkId";
import { declineFriendRequest } from "../../../../server/handlers/friends";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig)
  .use(dbConnection, protect(), checkId())
  .post(declineFriendRequest);

export default handler;
