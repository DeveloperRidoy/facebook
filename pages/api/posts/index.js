import nc from "next-connect";
import {
  addPost,
  deleteAllPosts,
  getAllPosts,
} from "../../../server/handlers/posts";
import protect from "../../../server/middlewares/protect";
import { uploadFiles } from "../../../server/middlewares/multer/multer";
import ncConfig from "../../../utils/server/ncConfig";
import dbConnection from "../../../server/middlewares/dbConnection";

const handler = nc(ncConfig)
  .use(dbConnection)
  .get(getAllPosts)
  .post(
    protect,
    uploadFiles({
      types: ["image"],
      fields: [{ name: "photo", maxCount: 10 }],
      fileSize: 100 * 1024 * 1024,
    }),
    addPost
  )
  .delete(protect, deleteAllPosts);

export default handler;
