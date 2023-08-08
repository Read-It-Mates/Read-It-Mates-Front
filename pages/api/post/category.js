import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const { selectedCategory } = req.query;
  const db = (await connectDB).db("books");

  let targetCollection = "bestSellers";

  if (selectedCategory === "가정/살림") {
    targetCollection = "bestSellers1_1";
  } else if (selectedCategory === "건강/취미") {
    targetCollection = "bestSellers1_2";
  } else if (selectedCategory === "경제/경영") {
    targetCollection = "bestSellers1_3";
  } else if (selectedCategory === "국어/외국어") {
    targetCollection = "bestSellers1_4";
  } else if (selectedCategory === "대학교재") {
    targetCollection = "bestSellers1_5";
  } else if (selectedCategory === "만화/라이트노벨") {
    targetCollection = "bestSellers1_6";
  } else if (selectedCategory === "사회/정치") {
    targetCollection = "bestSellers1_7";
  } else if (selectedCategory === "소설/시/희곡") {
    targetCollection = "bestSellers1_8";
  } else if (selectedCategory === "수험서/자격증") {
    targetCollection = "bestSellers1_9";
  } else if (selectedCategory === "어린이") {
    targetCollection = "bestSellers1_10";
  } else if (selectedCategory === "에세이") {
    targetCollection = "bestSellers1_11";
  } else if (selectedCategory === "여행") {
    targetCollection = "bestSellers1_12";
  } else if (selectedCategory === "역사") {
    targetCollection = "bestSellers1_13";
  } else if (selectedCategory === "예술") {
    targetCollection = "bestSellers1_14";
  } else if (selectedCategory === "유아") {
    targetCollection = "bestSellers1_15";
  } else if (selectedCategory === "인문") {
    targetCollection = "bestSellers1_16";
  } else if (selectedCategory === "인물") {
    targetCollection = "bestSellers1_17";
  } else if (selectedCategory === "자기계발") {
    targetCollection = "bestSellers1_18";
  } else if (selectedCategory === "자연과학") {
    targetCollection = "bestSellers1_19";
  } else if (selectedCategory === "잡지") {
    targetCollection = "bestSellers1_20";
  } else if (selectedCategory === "전집") {
    targetCollection = "bestSellers1_21";
  } else if (selectedCategory === "종교") {
    targetCollection = "bestSellers1_22";
  } else if (selectedCategory === "청소년") {
    targetCollection = "bestSellers1_23";
  } else if (selectedCategory === "IT/모바일") {
    targetCollection = "bestSellers1_24";
  } else if (selectedCategory === "초등학생") {
    targetCollection = "bestSellers1_25";
  } else if (selectedCategory === "중/고등학생") {
    targetCollection = "bestSellers1_26";
  }

  const books = await db.collection(targetCollection).find().toArray();
  res.status(200).json(books);
}
