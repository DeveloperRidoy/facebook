import User from "../../server/models/User";
import connectDb from "./connectDb";

const getUserBySlug = async (slug) => {
  try {
    await connectDb();
    const user = await User.findOne({ slug }).populate("friends posts");

    if (!user) return null;
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error)
    return null;
  }
};

export default getUserBySlug;
