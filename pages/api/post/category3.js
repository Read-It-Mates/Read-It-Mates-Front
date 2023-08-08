import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const { selectedCategory } = req.query;
  const db = (await connectDB).db("books");

  let targetCollection = "bestSellers3";

  if (selectedCategory === "경제/경영") {
    targetCollection = "bestSellers3_1";
  } else if (selectedCategory === "브랜드무크지") {
    targetCollection = "bestSellers3_2";
  } else if (selectedCategory === "애니메이션 굿즈") {
    targetCollection = "bestSellers3_3";
  } else if (selectedCategory === "어린이") {
    targetCollection = "bestSellers3_4";
  } else if (selectedCategory === "예술/건축/디자인") {
    targetCollection = "bestSellers3_5";
  } else if (selectedCategory === "외국어학습/교육") {
    targetCollection = "bestSellers3_6";
  } else if (selectedCategory === "이학/공학/컴퓨터") {
    targetCollection = "bestSellers3_7";
  } else if (selectedCategory === "인문/사회/논픽션") {
    targetCollection = "bestSellers3_8";
  } else if (selectedCategory === "일반") {
    targetCollection = "bestSellers3_9";
  } else if (selectedCategory === "자격/검정시험") {
    targetCollection = "bestSellers3_10";
  } else if (selectedCategory === "지브리 작품전") {
    targetCollection = "bestSellers3_11";
  } else if (selectedCategory === "캘린더") {
    targetCollection = "bestSellers3_12";
  } else if (selectedCategory === "CD/DVD") {
    targetCollection = "bestSellers3_13";
  } else if (selectedCategory === "문학") {
    targetCollection = "bestSellers3_14";
  } else if (selectedCategory === "일본잡지") {
    targetCollection = "bestSellers3_15";
  } else if (selectedCategory === "코믹/게임") {
    targetCollection = "bestSellers3_16";
  } else if (selectedCategory === "실용/취미/생활") {
    targetCollection = "bestSellers3_17";
  } else if (selectedCategory === "엔터테이먼트") {
    targetCollection = "bestSellers3_18";
  } else if (selectedCategory === "문고/신서") {
    targetCollection = "bestSellers3_19";
  }

  const books = await db.collection(targetCollection).find().toArray();
  res.status(200).json(books);
}
