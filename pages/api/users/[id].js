import nc from "next-connect";
import dbConnection from "../../../server/middlewares/dbConnection";
import checkId from "../../../server/middlewares/checkId";
import { deleteUserById, getUserById } from "../../../server/handlers/users";
import ncConfig from "../../../utils/server/ncConfig";

const handler = nc(ncConfig).use(dbConnection, checkId).get(getUserById).delete(deleteUserById);

export default handler;
