import nc from "next-connect";
import { seeMessages } from "../../../server/handlers/chats";
import protect from "../../../server/middlewares/protect";
import ncConfig from "../../../utils/server/ncConfig";
import dbConnection from "../../../server/middlewares/dbConnection";

const handler = nc(ncConfig).use(dbConnection, protect()).patch(seeMessages);

export default handler;
