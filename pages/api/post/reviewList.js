import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const title = req.query.title;

  const db = (await connectDB).db("books");
  const result = await db.collection("review").find({ title }).toArray();

  if (!result) {
    res.status(404).json({ message: "리뷰를 찾을 수 없습니다." });
  } else {
    res.status(200).json(result);
  }
}
