import { connectDB } from "/util/database";

export default async function handler(req, res) {
  if (req.method === "GET" && req.query.term) {
    const searchTerm = req.query.term;

    // MongoDB 연결
    const db = (await connectDB).db("books");
    const regexQuery = { title: { $regex: searchTerm, $options: "i" } };

    // 각 컬렉션에서 검색 결과 가져오기

    // korea
    const bestSellers = await db
      .collection("bestSellers")
      .find(regexQuery)
      .toArray();
    const steadySellers = await db
      .collection("steadySellers")
      .find(regexQuery)
      .toArray();
    const newBook = await db.collection("newBook").find(regexQuery).toArray();
    const bestSellers1_1 = await db
      .collection("bestSellers1_1")
      .find(regexQuery)
      .toArray();
    const bestSellers1_2 = await db
      .collection("bestSellers1_2")
      .find(regexQuery)
      .toArray();
    const bestSellers1_3 = await db
      .collection("bestSellers1_3")
      .find(regexQuery)
      .toArray();
    const bestSellers1_4 = await db
      .collection("bestSellers1_4")
      .find(regexQuery)
      .toArray();
    const bestSellers1_5 = await db
      .collection("bestSellers1_5")
      .find(regexQuery)
      .toArray();
    const bestSellers1_6 = await db
      .collection("bestSellers1_6")
      .find(regexQuery)
      .toArray();
    const bestSellers1_7 = await db
      .collection("bestSellers1_7")
      .find(regexQuery)
      .toArray();
    const bestSellers1_8 = await db
      .collection("bestSellers1_8")
      .find(regexQuery)
      .toArray();
    const bestSellers1_9 = await db
      .collection("bestSellers1_9")
      .find(regexQuery)
      .toArray();
    const bestSellers1_10 = await db
      .collection("bestSellers1_10")
      .find(regexQuery)
      .toArray();
    const bestSellers1_11 = await db
      .collection("bestSellers1_11")
      .find(regexQuery)
      .toArray();
    const bestSellers1_12 = await db
      .collection("bestSellers1_12")
      .find(regexQuery)
      .toArray();
    const bestSellers1_13 = await db
      .collection("bestSellers1_13")
      .find(regexQuery)
      .toArray();
    const bestSellers1_14 = await db
      .collection("bestSellers1_14")
      .find(regexQuery)
      .toArray();
    const bestSellers1_15 = await db
      .collection("bestSellers1_15")
      .find(regexQuery)
      .toArray();
    const bestSellers1_16 = await db
      .collection("bestSellers1_16")
      .find(regexQuery)
      .toArray();
    const bestSellers1_17 = await db
      .collection("bestSellers1_17")
      .find(regexQuery)
      .toArray();
    const bestSellers1_18 = await db
      .collection("bestSellers1_18")
      .find(regexQuery)
      .toArray();
    const bestSellers1_19 = await db
      .collection("bestSellers1_19")
      .find(regexQuery)
      .toArray();
    const bestSellers1_20 = await db
      .collection("bestSellers1_20")
      .find(regexQuery)
      .toArray();
    const bestSellers1_21 = await db
      .collection("bestSellers1_21")
      .find(regexQuery)
      .toArray();
    const bestSellers1_22 = await db
      .collection("bestSellers1_22")
      .find(regexQuery)
      .toArray();
    const bestSellers1_23 = await db
      .collection("bestSellers1_23")
      .find(regexQuery)
      .toArray();
    const bestSellers1_24 = await db
      .collection("bestSellers1_24")
      .find(regexQuery)
      .toArray();
    const bestSellers1_25 = await db
      .collection("bestSellers1_25")
      .find(regexQuery)
      .toArray();
    const bestSellers1_26 = await db
      .collection("bestSellers1_26")
      .find(regexQuery)
      .toArray();

    // western
    const bestSellers2 = await db
      .collection("bestSellers2")
      .find(regexQuery)
      .toArray();
    const steadySellers2 = await db
      .collection("steadySellers2")
      .find(regexQuery)
      .toArray();
    const newBook2 = await db.collection("newBook2").find(regexQuery).toArray();
    const bestSellers2_1 = await db
      .collection("bestSellers2_1")
      .find(regexQuery)
      .toArray();
    const bestSellers2_2 = await db
      .collection("bestSellers2_2")
      .find(regexQuery)
      .toArray();
    const bestSellers2_3 = await db
      .collection("bestSellers2_3")
      .find(regexQuery)
      .toArray();
    const bestSellers2_4 = await db
      .collection("bestSellers2_4")
      .find(regexQuery)
      .toArray();
    const bestSellers2_5 = await db
      .collection("bestSellers2_5")
      .find(regexQuery)
      .toArray();
    const bestSellers2_6 = await db
      .collection("bestSellers2_6")
      .find(regexQuery)
      .toArray();
    const bestSellers2_7 = await db
      .collection("bestSellers2_7")
      .find(regexQuery)
      .toArray();
    const bestSellers2_8 = await db
      .collection("bestSellers2_8")
      .find(regexQuery)
      .toArray();
    const bestSellers2_9 = await db
      .collection("bestSellers2_9")
      .find(regexQuery)
      .toArray();
    const bestSellers2_10 = await db
      .collection("bestSellers2_10")
      .find(regexQuery)
      .toArray();
    const bestSellers2_11 = await db
      .collection("bestSellers2_11")
      .find(regexQuery)
      .toArray();
    const bestSellers2_12 = await db
      .collection("bestSellers2_12")
      .find(regexQuery)
      .toArray();
    const bestSellers2_13 = await db
      .collection("bestSellers2_13")
      .find(regexQuery)
      .toArray();
    const bestSellers2_14 = await db
      .collection("bestSellers2_14")
      .find(regexQuery)
      .toArray();

    // japan
    const bestSellers3 = await db
      .collection("bestSellers3")
      .find(regexQuery)
      .toArray();
    const steadySellers3 = await db
      .collection("steadySellers3")
      .find(regexQuery)
      .toArray();
    const newBook3 = await db.collection("newBook3").find(regexQuery).toArray();
    const bestSellers3_1 = await db
      .collection("bestSellers3_1")
      .find(regexQuery)
      .toArray();
    const bestSellers3_2 = await db
      .collection("bestSellers3_2")
      .find(regexQuery)
      .toArray();
    const bestSellers3_3 = await db
      .collection("bestSellers3_3")
      .find(regexQuery)
      .toArray();
    const bestSellers3_4 = await db
      .collection("bestSellers3_4")
      .find(regexQuery)
      .toArray();
    const bestSellers3_5 = await db
      .collection("bestSellers3_5")
      .find(regexQuery)
      .toArray();
    const bestSellers3_6 = await db
      .collection("bestSellers3_6")
      .find(regexQuery)
      .toArray();
    const bestSellers3_7 = await db
      .collection("bestSellers3_7")
      .find(regexQuery)
      .toArray();
    const bestSellers3_8 = await db
      .collection("bestSellers3_8")
      .find(regexQuery)
      .toArray();
    const bestSellers3_9 = await db
      .collection("bestSellers3_9")
      .find(regexQuery)
      .toArray();
    const bestSellers3_10 = await db
      .collection("bestSellers3_10")
      .find(regexQuery)
      .toArray();
    const bestSellers3_11 = await db
      .collection("bestSellers3_11")
      .find(regexQuery)
      .toArray();

    // 가져온 결과를 병합합니다.
    const books = [
      // korea
      ...bestSellers,
      ...steadySellers,
      ...newBook,
      ...bestSellers1_1,
      ...bestSellers1_2,
      ...bestSellers1_3,
      ...bestSellers1_4,
      ...bestSellers1_5,
      ...bestSellers1_6,
      ...bestSellers1_7,
      ...bestSellers1_8,
      ...bestSellers1_9,
      ...bestSellers1_10,
      ...bestSellers1_11,
      ...bestSellers1_12,
      ...bestSellers1_13,
      ...bestSellers1_14,
      ...bestSellers1_15,
      ...bestSellers1_16,
      ...bestSellers1_17,
      ...bestSellers1_18,
      ...bestSellers1_19,
      ...bestSellers1_20,
      ...bestSellers1_21,
      ...bestSellers1_22,
      ...bestSellers1_23,
      ...bestSellers1_24,
      ...bestSellers1_25,
      ...bestSellers1_26,
      // western
      ...bestSellers2,
      ...steadySellers2,
      ...newBook2,
      ...bestSellers2_1,
      ...bestSellers2_2,
      ...bestSellers2_3,
      ...bestSellers2_4,
      ...bestSellers2_5,
      ...bestSellers2_6,
      ...bestSellers2_7,
      ...bestSellers2_8,
      ...bestSellers2_9,
      ...bestSellers2_10,
      ...bestSellers2_11,
      ...bestSellers2_12,
      ...bestSellers2_13,
      ...bestSellers2_14,
      // japan
      ...bestSellers3,
      ...steadySellers3,
      ...newBook3,
      ...bestSellers3_1,
      ...bestSellers3_2,
      ...bestSellers3_3,
      ...bestSellers3_4,
      ...bestSellers3_5,
      ...bestSellers3_6,
      ...bestSellers3_7,
      ...bestSellers3_8,
      ...bestSellers3_9,
      ...bestSellers3_10,
      ...bestSellers3_11,
    ];

    // 응답
    res.status(200).json(books);
  } else {
    res.status(404).json({ error: "Invalid request" });
  }
}
