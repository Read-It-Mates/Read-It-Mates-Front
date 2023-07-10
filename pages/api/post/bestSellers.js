import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const booksArray = req.body.books;

  if (req.method == "POST") {
    const db = (await connectDB).db("books");
    const postCollection = db.collection("post");

    // 변경된 베스트셀러를 추적하기 위한 플래그
    let isBestSellerUpdated = false;

    for (const book of booksArray) {
      const result = await postCollection.findOneAndUpdate(
        { title: book.title },
        {
          $set: {
            index: book.index,
            author: book.author,
            imageUrl: book.imageUrl,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      // 변경사항이 발견된 경우 플래그 업데이트
      if (result.lastErrorObject && result.lastErrorObject.updatedExisting) {
        isBestSellerUpdated = true;
      }
    }

    // 변경사항이 있는 경우 전체 요소 삭제 후 새 목록 추가
    if (isBestSellerUpdated) {
      await postCollection.deleteMany({});
      await postCollection.insertMany(booksArray);
    }

    return res.status(200).json("저장완료");
  }
}
