import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import { getUserBySlug } from "../../../../server/handlers/users";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig).use(dbConnection).get(getUserBySlug);

export default handler;
