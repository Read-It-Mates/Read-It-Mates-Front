import { connectDB } from "/util/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const db = (await connectDB).db("books");

  const result = await db.collection("review").insertOne(req.body);

  res.status(200).json({ message: "리뷰 성공" });
}
