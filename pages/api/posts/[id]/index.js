import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import checkId from "../../../../server/middlewares/checkId";
import { deletePostById, getPostById } from "../../../../server/handlers/posts";
import protect from "../../../../server/middlewares/protect";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig)
  .use(dbConnection, protect(), checkId())
  .get(getPostById)
  .delete(deletePostById);

export default handler;
