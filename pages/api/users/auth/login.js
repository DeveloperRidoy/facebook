import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import { loginUser } from "../../../../server/handlers/auth";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig).use(dbConnection).post(loginUser);

export default handler;
