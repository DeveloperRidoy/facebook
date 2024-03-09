import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import { logoutUser } from "../../../../server/handlers/auth";
import protect from "../../../../server/middlewares/protect";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig).use(dbConnection, protect()).get(logoutUser);

export default handler;
