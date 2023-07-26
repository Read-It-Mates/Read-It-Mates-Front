import { connectDB } from "/util/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  if (req.method == "POST") {
    if (req.body.roomTitle == "") {
      return res.status(400).json("방제목을 입력해주세요.");
    }
    if (req.body.bookTitle == "") {
      return res.status(400).json("책제목을 입력해주세요.");
    }

    const db = (await connectDB).db("books");
    const countersCollection = db.collection("counters");

    // "room_index" 도큐먼트가 있는지 확인
    const roomIndexDoc = await countersCollection.findOne({
      _id: "room_index",
    });

    if (!roomIndexDoc) {
      // "room_index" 도큐먼트가 없으면, 생성하기
      await countersCollection.insertOne({ _id: "room_index", index: 1 });
      req.body.index = 1;
    } else {
      // "room_index" 도큐먼트가 있는 경우, index 값에 1 더하기
      await countersCollection.findOneAndUpdate(
        { _id: "room_index" },
        { $inc: { index: 1 } }
      );

      // 증가된 index 값을 가져오기
      const newIndex = (await countersCollection.findOne({ _id: "room_index" }))
        .index;
      req.body.index = newIndex;
    }
    const result = await db.collection("room").insertOne(req.body);

    const insertedId = result.insertedId; // 삽입된 객체의 _id 값 추출
    res.status(200).json(insertedId);
  }
}
