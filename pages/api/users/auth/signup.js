import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import { registerUser } from "../../../../server/handlers/auth";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig).use(dbConnection).post(registerUser);

export default handler;
