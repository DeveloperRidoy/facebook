import nc from "next-connect";
import { getUserChats } from "../../../server/handlers/chats";
import protect from "../../../server/middlewares/protect";
import dbConnection from "../../../server/middlewares/dbConnection";
import ncConfig from "../../../utils/server/ncConfig";

const handler = nc(ncConfig).use(dbConnection, protect()).get(getUserChats);

export default handler;
