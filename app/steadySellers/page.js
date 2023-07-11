import { connectDB } from "/util/database";

export default async function SteadySellers() {
  const db = (await connectDB).db("books");
  let result = await db.collection("steadySellers").find().toArray();

  return (
    <div className="container">
      {result.map((item, index) => {
        return (
          <div className="bookItem" key={index}>
            <h4 className="title">
              {item.index + ". "}
              {item.title}
              <br></br>
              {" - " + item.author + " - "}
            </h4>
            <img className="coverImage" src={item.imageUrl} alt=""></img>
          </div>
        );
      })}
    </div>
  );
}
