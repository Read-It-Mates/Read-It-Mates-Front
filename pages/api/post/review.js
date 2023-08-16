import { connectDB } from "/util/database";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);

  const db = (await connectDB).db("books");

  const existingReview = await db
    .collection("review")
    .findOne({ title: req.body.title });

  if (existingReview) {
    // 동일한 title이 있는 경우, 해당 도큐먼트를 업데이트합니다.
    await db.collection("review").updateOne(
      { title: req.body.title },
      {
        $push: {
          author: { $each: req.body.author },
          text: { $each: req.body.text },
        },
      }
    );
  } else {
    // 동일한 title이 없는 경우, 새 도큐먼트를 추가합니다.
    await db.collection("review").insertOne(req.body);
  }

  res.status(200).json({ message: "리뷰 성공" });
}
