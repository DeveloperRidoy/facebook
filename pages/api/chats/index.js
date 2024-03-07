import nc from "next-connect";
import protect from "../../../server/middlewares/protect";
import { sendPrivateChatMessage } from "../../../server/handlers/chats";
import { uploadFiles } from "../../../server/middlewares/multer/multer";
import ncConfig from "../../../utils/server/ncConfig";
import dbConnection from "../../../server/middlewares/dbConnection";

const handler = nc(ncConfig)
  .use(dbConnection, protect())
  .post(
    uploadFiles({
      types: ["image", "video"],
      fields: [{ name: "photo", maxCount: 10 }],
      fileSize: 100 * 1024 * 1024,
    }),
    sendPrivateChatMessage
  );

export default handler;
