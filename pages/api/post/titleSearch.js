import { connectDB } from "/util/database";

export default async function handler(req, res) {
  if (req.method === "GET" && req.query.term) {
    const searchTerm = req.query.term;

    // MongoDB 연결
    const db = (await connectDB).db("books");
    const books = await db
      .collection("bestSellers")
      .find({ title: { $regex: searchTerm, $options: "i" } }) // 제목에 검색어가 포함된 문서를 찾습니다.
      .toArray();

    // 응답
    res.status(200).json(books);
  } else {
    res.status(404).json({ error: "Invalid request" });
  }
}
