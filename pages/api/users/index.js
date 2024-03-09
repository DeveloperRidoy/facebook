import nc from "next-connect";
import dbConnection from "../../../server/middlewares/dbConnection";
import {
  deleteAllUsers,
  getAllUsers,
  updateMe,
} from "../../../server/handlers/users";
import protect from "../../../server/middlewares/protect";
import { uploadPhotos } from "../../../server/middlewares/multer/multer";
import ncConfig from "../../../utils/server/ncConfig";

const handler = nc(ncConfig)
  .use(dbConnection)
  .get(getAllUsers)
  .delete(protect(), deleteAllUsers)
  .patch(
    protect(),
    uploadPhotos({
      fields: [
        { name: "photoFile", maxCount: 1 },
        { name: "coverPhotoFile", maxCount: 1 },
      ],
      fileSize: 5 * 1024 * 1024,
      resize: true,
    }),
    updateMe
  );
export default handler;

// set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
