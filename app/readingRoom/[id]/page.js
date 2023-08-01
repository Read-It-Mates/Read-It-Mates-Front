import { connectDB } from "/util/database";
import { ObjectId } from "mongodb";
import Room from "./room";

export default async function ReadingRoom(props) {
  const db = (await connectDB).db("books");
  let result = await db
    .collection("room")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <Room data={result} />
    </div>
  );
}
