export default async function handler(req, res) {
  return res
    .status(404)
    .json({ status: "fail", message: "resource not found" });
}
