import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const { selectedCategory } = req.query;
  const db = (await connectDB).db("books");

  let targetCollection = "bestSellers2";

  if (selectedCategory === "ELT/사전") {
    targetCollection = "bestSellers2_1";
  } else if (selectedCategory === "문학/소설") {
    targetCollection = "bestSellers2_2";
  } else if (selectedCategory === "경제/경영") {
    targetCollection = "bestSellers2_3";
  } else if (selectedCategory === "인문/사회") {
    targetCollection = "bestSellers2_4";
  } else if (selectedCategory === "예술/대중문화") {
    targetCollection = "bestSellers2_5";
  } else if (selectedCategory === "취미/라이프") {
    targetCollection = "bestSellers2_6";
  } else if (selectedCategory === "컴퓨터") {
    targetCollection = "bestSellers2_7";
  } else if (selectedCategory === "자연과학") {
    targetCollection = "bestSellers2_8";
  } else if (selectedCategory === "대학교재/전문서") {
    targetCollection = "bestSellers2_9";
  } else if (selectedCategory === "해외잡지") {
    targetCollection = "bestSellers2_10";
  } else if (selectedCategory === "유아/어린이") {
    targetCollection = "bestSellers2_11";
  } else if (selectedCategory === "캐릭터북") {
    targetCollection = "bestSellers2_12";
  } else if (selectedCategory === "초등코스북") {
    targetCollection = "bestSellers2_13";
  } else if (selectedCategory === "학습서") {
    targetCollection = "bestSellers2_14";
  }

  const books = await db.collection(targetCollection).find().toArray();
  res.status(200).json(books);
}
