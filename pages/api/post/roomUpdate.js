import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  let change = {
    roomTitle: req.body.roomTitle,
    bookTitle: req.body.bookTitle,
    author: req.body.author,
    image: req.body.image,
    category: req.body.category,
  };
  const db = (await connectDB).db("books");

  await db
    .collection("room")
    .updateOne({ _id: new ObjectId(req.body._id) }, { $set: change });

  return res.redirect(302, `/readingRoom/${req.body._id}`);
}
