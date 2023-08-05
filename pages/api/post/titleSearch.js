import { connectDB } from "/util/database";

export default async function handler(req, res) {
  if (req.method === "GET" && req.query.term) {
    const searchTerm = req.query.term;

    // MongoDB 연결
    const db = (await connectDB).db("books");
    const regexQuery = { title: { $regex: searchTerm, $options: "i" } };

    // 각 컬렉션에서 검색 결과 가져오기
    const books1 = await db
      .collection("bestSellers")
      .find(regexQuery)
      .toArray();
    const books2 = await db
      .collection("bestSellers2")
      .find(regexQuery)
      .toArray();
    const books3 = await db
      .collection("bestSellers3")
      .find(regexQuery)
      .toArray();

    // 가져온 결과를 병합합니다.
    const books = [...books1, ...books2, ...books3];

    // 응답
    res.status(200).json(books);
  } else {
    res.status(404).json({ error: "Invalid request" });
  }
}
