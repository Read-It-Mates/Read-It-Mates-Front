import { connectDB } from "/util/database";
import Grid from "../components/grid";

export default async function Domestic() {
  const db = (await connectDB).db("books");
  let result = await db.collection("bestSellers3").find().toArray();
  const categories = [
    "라이트노벨",
    "만화/애니/피규어",
    "문학",
    "실용서",
    "엔터테이먼트",
    "유아/어린이",
    "일반과학",
    "일반사회",
    "일본잡지",
    "컴퓨터",
    "학습",
  ];
  return (
    <>
      <Grid result={result} categories={categories} />
    </>
  );
}
