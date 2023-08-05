import { connectDB } from "/util/database";
import Grid from "../components/grid";

export default async function Domestic() {
  const db = (await connectDB).db("books");
  let result = await db.collection("bestSellers2").find().toArray();
  const categories = [
    "ELT/사전",
    "문학/소설",
    "경제/경영",
    "인문/사회",
    "예술/대중문화",
    "취미/라이프",
    "컴퓨터",
    "자연과학",
    "대학교재/전문서",
    "해외잡지",
    "유아/어린이",
    "캐릭터북",
    "초등코스북",
    "학습서",
  ];
  return (
    <>
      <Grid result={result} categories={categories} />
    </>
  );
}
