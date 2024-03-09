import nc from "next-connect";
import checkId from "../../../../../server/middlewares/checkId";
import protect from "../../../../../server/middlewares/protect";
import { addComment } from "../../../../../server/handlers/posts";
import ncConfig from "../../../../../utils/server/ncConfig";
import dbConnection from "../../../../../server/middlewares/dbConnection";

const handler = nc(ncConfig)
  .use(dbConnection, protect(), checkId())
  .patch(addComment);

export default handler;
