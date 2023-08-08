import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const { selectedCategory } = req.query;
  const db = (await connectDB).db("books");

  let targetCollection = "bestSellers3";

  if (selectedCategory === "라이트노벨") {
    targetCollection = "bestSellers3_1";
  } else if (selectedCategory === "만화/애니/피규어") {
    targetCollection = "bestSellers3_2";
  } else if (selectedCategory === "문학") {
    targetCollection = "bestSellers3_3";
  } else if (selectedCategory === "실용서") {
    targetCollection = "bestSellers3_4";
  } else if (selectedCategory === "엔터테이먼트") {
    targetCollection = "bestSellers3_5";
  } else if (selectedCategory === "유아/어린이") {
    targetCollection = "bestSellers3_6";
  } else if (selectedCategory === "일반과학") {
    targetCollection = "bestSellers3_7";
  } else if (selectedCategory === "일반사회") {
    targetCollection = "bestSellers3_8";
  } else if (selectedCategory === "일본잡지") {
    targetCollection = "bestSellers3_9";
  } else if (selectedCategory === "컴퓨터") {
    targetCollection = "bestSellers3_10";
  } else if (selectedCategory === "학습") {
    targetCollection = "bestSellers3_11";
  }

  const books = await db.collection(targetCollection).find().toArray();
  res.status(200).json(books);
}
