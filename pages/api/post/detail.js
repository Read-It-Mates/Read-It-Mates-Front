import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const detailArray = req.body.detail;
  if (req.method == "POST") {
    const db = (await connectDB).db("books");
    const detailCollection = db.collection("detail");

    for (const detail of detailArray) {
      const result = await detailCollection.findOneAndUpdate(
        { title: detail.title },
        {
          $set: {
            author: detail.author,
            topic: detail.topic,
            intro: detail.intro,
            contents: detail.contents,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      return res.status(200).json("저장완료");
    }
  }
}
