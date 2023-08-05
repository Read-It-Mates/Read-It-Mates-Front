import { connectDB } from "/util/database";
import Category_image from "./components/Category_image";
import Room from "./components/Room";
import SideBar from "./components/sidebar";

export default async function Home() {
  // db 접근
  const db = (await connectDB).db("books");
  // 데이터 가져오기
  let result = await db.collection("bestSellers").find().toArray();
  let result2 = await db.collection("bestSellers2").find().toArray();
  let result3 = await db.collection("bestSellers3").find().toArray();

  let room = await db.collection("room").find().toArray();

  // 메인페이지 책 랜덤함수
  result = result.slice().sort(() => Math.random() - 0.5);
  result2 = result2.slice().sort(() => Math.random() - 0.5);
  result3 = result3.slice().sort(() => Math.random() - 0.5);

  // 정렬용 props
  let gridNum = 9;

  // 열 개수 props
  let columnNum = 2;

  let category1 = 1;
  let category2 = 2;
  let category3 = 3;

  // 나라 props
  let country1 = "국내도서";
  let country2 = "서양도서";
  let country3 = "일본도서";
  let country4 = "해외도서";

  return (
    <>
      <SideBar />
      <div className="container4">
        {/* 리딩룸 */}
        <div id="reading-room" className="home-status-container">
          <Room data={room} />
        </div>
        {/* 베스트셀러 */}
        <div id="best-sellers" className="category-title">
          베스트셀러
        </div>
        <div className="kind-container1">
          <div className="main-container">
            <Category_image
              data={result}
              num={gridNum}
              column={columnNum}
              country={country1}
              category={category1}
            />
            <Category_image
              data={result2}
              num={gridNum}
              column={columnNum}
              country={country2}
              category={category1}
            />
            <Category_image
              data={result3}
              num={gridNum}
              column={columnNum}
              country={country3}
              category={category1}
            />
          </div>
        </div>
        {/* 스테디셀러 */}
        <div id="steady-sellers" className="category-title2">
          스테디셀러
        </div>
        <div className="kind-container2">
          <div className="main-container">
            <Category_image
              data={result}
              num={gridNum}
              column={columnNum}
              country={country1}
              category={category2}
            />
            <Category_image
              data={result2}
              num={gridNum}
              column={columnNum}
              country={country2}
              category={category2}
            />
            <Category_image
              data={result3}
              num={gridNum}
              column={columnNum}
              country={country3}
              category={category2}
            />
          </div>
        </div>
        {/* 신간베스트 */}
        <div id="new-best" className="category-title3">
          신간베스트
        </div>
        <div className="kind-container3">
          <div className="main-container">
            <Category_image
              data={result}
              num={gridNum}
              column={columnNum}
              country={country1}
              category={category3}
            />
            <Category_image
              data={result2}
              num={gridNum}
              column={columnNum}
              country={country2}
              category={category3}
            />
            <Category_image
              data={result3}
              num={gridNum}
              column={columnNum}
              country={country3}
              category={category3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
