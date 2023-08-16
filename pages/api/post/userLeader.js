import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const db = (await connectDB).db("books");

  // 현재의 participants 배열을 가져오기
  const room = await db
    .collection("room")
    .findOne({ _id: new ObjectId(req.body._id) });
  const participants = room.participants;

  // 배열에서 userName과 매칭되는 위치 찾기
  const index = participants.indexOf(req.body.userName);

  // 배열에서 값 위치 변경
  if (index !== -1) {
    [participants[0], participants[index]] = [
      participants[index],
      participants[0],
    ];
  }

  await db
    .collection("room")
    .updateOne(
      { _id: new ObjectId(req.body._id) },
      { $set: { participants: participants } }
    );

  res.status(200).json({ message: "위임 성공" });
}
