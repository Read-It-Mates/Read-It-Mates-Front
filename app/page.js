import { connectDB } from "/util/database";
import Category_image from "./components/Category_image";
import Room from "./components/Room";

// 필요한 라이브러리 가져오기
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

// 베스트셀러 페이지 URL
const bestURL =
  "https://www.yes24.com/24/category/bestseller?CategoryNumber=001&sumgb=06&PageNumber=1&FetchSize=10";

export async function crawlDetails($, element, index, intro) {
  const title = $(element).find("p > a").first().text().trim();
  const author = $(element).find("div > a").first().text().trim();
  const linkElement = $(element).find("p > a").attr("href");
  const link = "https://www.yes24.com" + linkElement;
  const bestseller = {
    index: index + 1,
    title,
    author,
    intro,
  };
  try {
    const response = await axios.get(link, { responseType: "arraybuffer" });
    const decodedData = iconv.decode(response.data, "utf-8").toString();
    const details$ = cheerio.load(decodedData);

    // 이미지 크롤링
    const imageElement = details$("em.imgBdr > img.gImg");
    const image = imageElement.attr("src") || imageElement.data("src");

    // 카테고리 크롤링
    const category = details$("#infoset_goodsCate div.infoSetCont_wrap")
      .find("ul.yesAlertLi > li")
      .first()
      .find("a")
      .eq(1)
      .text();

    if (title && author) {
      bestseller.image = image;
      bestseller.category = category;
    }

    return bestseller;
  } catch (error) {
    console.error("Error while crawling details:", error.message);
  }
}

export default async function Home() {
  const response = await axios.get(bestURL, { responseType: "arraybuffer" });
  const decodedData = iconv.decode(response.data, "EUC-KR").toString();
  const $ = cheerio.load(decodedData);
  const bestsellers = [];

  // intro 크롤링
  const intros = $(".line > p.read")
    .map((_, p) => $(p).text().trim())
    .get();

  const bestsellersPromises = $(".goodsTxtInfo")
    .map(async (index, element) => {
      const bestseller = await crawlDetails($, element, index, intros[index]);
      return bestseller;
    })
    .get();

  // bestsellers 배열에 추가
  bestsellers.push(...(await Promise.all(bestsellersPromises)));

  await Promise.all(bestsellersPromises).then(async () => {
    await axios.post("http://localhost:3000/api/post/bestSellers", bestsellers);
  });

  // db 접근
  const db = (await connectDB).db("books");
  // 데이터 가져오기
  let result = await db.collection("bestSellers").find().toArray();
  let result2 = await db.collection("room").find().toArray();

  // 메인페이지 책 랜덤함수
  result = result.slice().sort(() => Math.random() - 0.5);

  // 정렬용 props
  let gridNum1 = 6;
  let gridNum2 = 9;
  let gridNum3 = 14;

  // 열 개수 props
  let columnNum1 = 1;
  let columnNum2 = 2;
  let columnNum3 = 3;

  // 나라 props
  let country1 = "국내도서";
  let country2 = "서양도서";
  let country3 = "일본도서";
  let country4 = "해외도서";
  let country5 = "추천도서";

  return (
    <div>
      {/* 리딩룸 */}
      <div className="home-status-container">
        <Room data={result2} />
      </div>
      {/* 베스트셀러 */}
      <div className="kind-container1">
        <div className="category-title">베스트셀러</div>
        <div className="main-container">
          <Category_image
            data={result}
            num={gridNum1}
            column={columnNum1}
            country={country1}
          />
          <Category_image
            data={result}
            num={gridNum1}
            column={columnNum1}
            country={country2}
          />
          <Category_image
            data={result}
            num={gridNum1}
            column={columnNum1}
            country={country3}
          />
        </div>
      </div>
      {/* 스테디셀러 */}
      <div className="kind-container2">
        <div className="category-title">스테디셀러</div>
        <div className="main-container">
          <Category_image
            data={result}
            num={gridNum2}
            column={columnNum2}
            country={country1}
          />
          <Category_image
            data={result}
            num={gridNum2}
            column={columnNum2}
            country={country4}
          />
        </div>
      </div>
      {/* 신간베스트 */}
      <div className="kind-container3">
        <div className="category-title">신간베스트</div>
        <div className="main-container">
          <Category_image
            data={result}
            num={gridNum2}
            column={columnNum2}
            country={country1}
          />
          <Category_image
            data={result}
            num={gridNum2}
            column={columnNum2}
            country={country4}
          />
        </div>
      </div>
      {/* 리딧베스트 */}
      <div className="kind-container4">
        <div className="category-title">리딧베스트</div>
        <div className="main-container">
          <Category_image
            data={result}
            num={gridNum3}
            column={columnNum3}
            country={country5}
          />
        </div>
      </div>
    </div>
  );
}
