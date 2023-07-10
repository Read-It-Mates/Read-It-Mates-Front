export default async function Home() {
  // 필요한 라이브러리 가져오기
  const axios = require("axios");
  const cheerio = require("cheerio");
  // 베스트셀러 책 정보를 저장할 배열
  const bestSellers = [];
  // 알라딘 베스트셀러 페이지 URL
  const aladinBestSellerURL = "https://www.aladin.co.kr/shop/common/wbest.aspx";
  // axios HTTP 요청
  await axios
    .get(aladinBestSellerURL)
    .then((response) => {
      // 요청 결과 상태가 정상일 경우
      if (response.status === 200) {
        // HTML 데이터 변수
        const html = response.data;
        // cheerio를 사용하여 HTML 데이터를 분석 및 추출하기 쉽도록 처리
        const $ = cheerio.load(html);

        // 각 베스트셀러 책 아이템에 대해 작업
        $(".ss_book_box").each((index, element) => {
          // 책 제목 추출
          const title = $(element).find(".bo3 > b").text();
          // 저자 추출
          const author = $(element)
            .find(".ss_book_list ul li:eq(2) > a:eq(0)")
            .text();
          // 이미지 추출
          let imageUrl = $(element).find(".front_cover").attr("src");
          // 추출한 정보를 배열에 추가
          bestSellers.push({ index: index + 1, title, author, imageUrl });
        });
      }
    })
    .then(async () => {
      try {
        // 베스트셀러 정보 배열 전체를 서버에 전달
        await axios.post("http://localhost:3000/api/post/bestSellers", {
          books: bestSellers,
        });
      } catch (error) {
        console.error("데이터 전송 중 오류 발생:", error);
      }
    })

    // 에러 처리: 크롤링 도중 에러가 발생한 경우
    .catch((error) => {
      console.error("크롤링 도중 에러 발생:", error);
    });
}
