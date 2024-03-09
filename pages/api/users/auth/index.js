import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import { authenticate } from "../../../../server/handlers/auth";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig).use(dbConnection).get(authenticate);

export default handler;
