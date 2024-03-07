import nc from "next-connect";
import dbConnection from "../../../../server/middlewares/dbConnection";
import checkId from "../../../../server/middlewares/checkId";
import protect from "../../../../server/middlewares/protect";
import { addLike, removeLike } from "../../../../server/handlers/posts";
import ncConfig from "../../../../utils/server/ncConfig";

const handler = nc(ncConfig)
  .use(dbConnection, protect(), checkId)
  .patch(addLike)
  .delete(removeLike);

export default handler;
