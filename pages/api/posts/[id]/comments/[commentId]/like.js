import nc from "next-connect";
import checkId from "../../../../../../server/middlewares/checkId";
import protect from "../../../../../../server/middlewares/protect";
import {
  likeComment,
  unlikeComment,
} from "../../../../../../server/handlers/posts";
import ncConfig from "../../../../../../utils/server/ncConfig";
import dbConnection from "../../../../../../server/middlewares/dbConnection";

const handler = nc(ncConfig)
  .use(dbConnection, protect(), checkId())
  .post(likeComment)
  .delete(unlikeComment);

export default handler;
