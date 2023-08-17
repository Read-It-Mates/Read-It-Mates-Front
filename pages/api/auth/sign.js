import { connectDB } from "/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // 비밀번호 암호화
    let hash = await bcrypt.hash(req.body.pw, 10);

    const db = (await connectDB).db("books");
    // id 중복 방지
    const checkId = await db.collection("user").findOne({ id: req.body.email });

    if (checkId) {
      return res
        .status(400)
        .json("이미 존재하는 이메일입니다. 다른 이메일을 선택해주세요.");
    }
    req.body.pw = hash;
    req.body.pw2 = hash;
    await db.collection("user").insertOne(req.body);

    return res.redirect(302, "/");
  }
}
