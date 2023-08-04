import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";
import Room from "./room";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function ReadingRoom(props) {
  const db = (await connectDB).db("books");
  let result = await db
    .collection("room")
    .findOne({ _id: new ObjectId(props.params.id) });

  let session = await getServerSession(authOptions);

  // 참가자 목록 추가
  if (session != null) {
    await db.collection("room").updateOne(
      { _id: new ObjectId(props.params.id) },
      // 세션 중복체크 연산자 사용
      { $addToSet: { participants: session.user.name } }
    );
  }

  return (
    <div className="container2">
      <Room data={result} session={session} />
    </div>
  );
}
