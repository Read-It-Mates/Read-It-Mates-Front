import { connectDB } from "/util/database";

export default async function handler(req, res) {
  const booksArray = req.body;
  if (req.method == "POST") {
    const db = (await connectDB).db("books");
    const bestCollection = db.collection("bestSellers");

    // 변경된 베스트셀러를 추적하기 위한 플래그
    let isBestSellerUpdated = true;

    for (const book of booksArray) {
      const result = await bestCollection.findOneAndUpdate(
        { title: book.title },
        {
          $set: {
            index: book.index,
            author: book.author,
            image: book.image,
            intro: book.lntro,
            category: book.category,
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

    const documentsCount = await bestCollection.countDocuments({});

    // 변경사항이 있는 경우 또는 베스트셀러 컬렉션이 비어 있을 때 전체 요소 삭제 후 새 목록 추가
    if (booksArray.length > 0 && (isBestSellerUpdated || !documentsCount)) {
      await bestCollection.deleteMany({});
      await bestCollection.insertMany(booksArray);
    }

    return res.status(200).json("저장완료");
  }
}
