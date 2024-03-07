import nc from "next-connect";
import checkId from "../../../../../server/middlewares/checkId";
import { quickLogin } from "../../../../../server/handlers/auth";
import ncConfig from "../../../../../utils/server/ncConfig";
import dbConnection from "../../../../../server/middlewares/dbConnection";

const handler = nc(ncConfig).use(dbConnection, checkId).get(quickLogin);

export default handler;
