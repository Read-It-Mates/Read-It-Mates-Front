import { connectDB } from "/util/database";
import Grid from "../components/grid";

export default async function Domestic() {
  const db = (await connectDB).db("books");
  let result = await db.collection("bestSellers").find().toArray();
  const categories = [
    "가정/살림",
    "건강/취미",
    "경제/경영",
    "국어/외국어",
    "대학교재",
    "만화/라이트노벨",
    "사회/정치",
    "소설/시/희곡",
    "수험서/자격증",
    "어린이",
    "에세이",
    "여행",
    "역사",
    "예술",
    "유아",
    "인문",
    "인물",
    "자기계발",
    "자연과학",
    "잡지",
    "전집",
    "종교",
    "청소년",
    "IT/모바일",
    "초등학생",
    "중/고등학생",
  ];
  return (
    <>
      <Grid result={result} categories={categories} />
    </>
  );
}
