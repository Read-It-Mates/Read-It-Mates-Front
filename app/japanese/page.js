import { connectDB } from "/util/database";

export default async function Japanese() {
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
            <img className="coverImage2" src={item.image} alt=""></img>
          </div>
        );
      })}
    </div>
  );
}
