import { connectDB } from "/util/database";

export default async function handler(req, res) {
  let name = JSON.parse(req.body);
  // MongoDB 연결
  const db = (await connectDB).db("books");
  await db.collection("room").insertOne({ name: name });
}
