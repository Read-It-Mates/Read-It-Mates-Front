import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const db = (await connectDB).db("books");

  await db.collection("room").deleteOne({ _id: new ObjectId(req.body._id) });

  res.status(200).json({ message: "삭제 성공" });
}
