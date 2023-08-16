import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const db = (await connectDB).db("books");

  await db
    .collection("room")
    .updateOne(
      { _id: new ObjectId(req.body._id) },
      { $pull: { participants: req.body.userName } }
    );

  return res.redirect(302, "/");
}
