import { connectDB } from "/util/database";
import Category_image from "./components/Category_image";
import Room from "./components/Room";
import SideBar from "./components/sidebar";

// 필요한 라이브러리 가져오기
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

// 베스트셀러 페이지 URL
const bestURL =
  "https://www.yes24.com/24/category/bestseller?CategoryNumber=001&sumgb=06&PageNumber=1&FetchSize=1";
const bestURL2 =
  "https://www.yes24.com/24/category/bestseller?CategoryNumber=002&sumgb=06&PageNumber=1&FetchSize=1";
const bestURL3 =
  "https://www.yes24.com/24/category/bestseller?CategoryNumber=002001010&sumgb=06&PageNumber=1&FetchSize=1";

export async function crawlDetails($, element, index, intro) {
  const title = $(element).find("p > a").first().text().trim();
  let author = $(element).find("div > a").first().text().trim();
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

    bestseller.image = image;
    bestseller.category = category;

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

  const response2 = await axios.get(bestURL2, { responseType: "arraybuffer" });
  const decodedData2 = iconv.decode(response2.data, "EUC-KR").toString();
  const $2 = cheerio.load(decodedData2);
  const bestsellers2 = [];

  const response3 = await axios.get(bestURL3, { responseType: "arraybuffer" });
  const decodedData3 = iconv.decode(response3.data, "EUC-KR").toString();
  const $3 = cheerio.load(decodedData3);
  const bestsellers3 = [];

  // intro 크롤링
  const intros = $(".line > p.read")
    .map((_, p) => $(p).text().trim())
    .get();
  const intros2 = $2(".line > p.read")
    .map((_, p) => $2(p).text().trim())
    .get();
  const intros3 = "";

  const bestsellersPromises = $(".goodsTxtInfo")
    .map(async (index, element) => {
      const bestseller = await crawlDetails($, element, index, intros[index]);
      return bestseller;
    })
    .get();

  const bestsellersPromises2 = $2(".goodsTxtInfo")
    .map(async (index, element) => {
      const bestseller2 = await crawlDetails(
        $2,
        element,
        index,
        intros2[index]
      );
      return bestseller2;
    })
    .get();

  const bestsellersPromises3 = $3(".goodsTxtInfo")
    .map(async (index, element) => {
      const bestseller3 = await crawlDetails($3, element, index, intros3);
      return bestseller3;
    })
    .get();

  // bestsellers 배열에 추가
  bestsellers.push(...(await Promise.all(bestsellersPromises)));
  // bestsellers2 배열에 추가
  bestsellers2.push(...(await Promise.all(bestsellersPromises2)));
  // bestsellers3 배열에 추가
  bestsellers3.push(...(await Promise.all(bestsellersPromises3)));

  await Promise.all(bestsellersPromises).then(async () => {
    await axios.post("http://localhost:3000/api/post/bestSellers", bestsellers);
  });

  await Promise.all(bestsellersPromises2).then(async () => {
    await axios.post(
      "http://localhost:3000/api/post/bestSellers2",
      bestsellers2
    );
  });

  await Promise.all(bestsellersPromises3).then(async () => {
    await axios.post(
      "http://localhost:3000/api/post/bestSellers3",
      bestsellers3
    );
  });

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
