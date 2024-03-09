import nc from "next-connect";
import { getMessageById } from "../../../server/handlers/chats";
import checkId from "../../../server/middlewares/checkId";
import protect from "../../../server/middlewares/protect";
import ncConfig from "../../../utils/server/ncConfig";
import dbConnection from "../../../server/middlewares/dbConnection";

const handler = nc(ncConfig)
  .use(dbConnection, protect(), checkId())
  .get(getMessageById);

export default handler;
