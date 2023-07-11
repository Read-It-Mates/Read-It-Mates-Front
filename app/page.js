import { connectDB } from "/util/database";
import HomeCategory from "./HomeCategory";

export default async function Home() {
  // 필요한 라이브러리 가져오기
  const axios = require("axios");
  const cheerio = require("cheerio");
  // 베스트셀러 책 정보를 저장할 배열
  const bestSellers = [];
  // 스테디셀러 책 정보를 저장할 배열
  const steadySellers = [];
  // 상세페이지 정보를 저장할 배열
  const detail = [];
  // 알라딘 베스트셀러 페이지 URL
  const aladinBestSellerURL =
    "https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=Bestseller&BranchType=1&CID=0&page=1&cnt=1000&SortOrder=1";
  // 알라딘 베스트셀러 페이지 URL2
  const aladinBestSellerURL2 =
    "https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=Bestseller&BranchType=1&CID=0&page=2&cnt=1000&SortOrder=1";
  // 알라딘 스테디셀러 페이지 URL
  const aladinSteadySellerURL =
    "https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=SteadySeller&BranchType=1&CID=0&page=1&cnt=100&SortOrder=1";
  // 알라딘 스테디셀러 페이지 URL2
  const aladinSteadySellerURL2 =
    "https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=SteadySeller&BranchType=1&CID=0&page=2&cnt=100&SortOrder=1";

  // --------------------------------------베스트셀러-----------------------------------------

  // axios HTTP 요청
  // await axios
  //   .get(aladinBestSellerURL)
  //   .then((response) => {
  //     // 요청 결과 상태가 정상일 경우
  //     if (response.status === 200) {
  //       // HTML 데이터 변수
  //       const html = response.data;
  //       // cheerio를 사용하여 HTML 데이터를 분석 및 추출하기 쉽도록 처리
  //       const $ = cheerio.load(html);

  //       // 각 베스트셀러 책 아이템에 대해 작업
  //       $(".ss_book_box").each((index, element) => {
  //         // 책 제목 추출
  //         const title = $(element).find(".bo3 > b").text();
  //         // 저자 추출
  //         const author = $(element)
  //           .find(".ss_book_list ul li:eq(2) > a:eq(0)")
  //           .text();
  //         // 링크 추출
  //         let link = $(element)
  //           .find(".ss_book_list ul li:eq(1) > a:eq(0)")
  //           .attr("href");
  //         if (link.includes("Search")) {
  //           link = $(element)
  //             .find(".ss_book_list ul li:eq(0) > a:eq(0)")
  //             .attr("href");
  //         }
  //         // 이미지 추출
  //         let imageUrl = $(element).find(".front_cover").attr("src");
  //         // 추출한 정보를 배열에 추가
  //         bestSellers.push({
  //           index: index + 1,
  //           title,
  //           author,
  //           link,
  //           imageUrl,
  //         });
  //       });
  //     }
  //   })
  //   .then(async () => {
  //     try {
  //       // 베스트셀러 정보 배열 전체를 서버에 전달
  //       await axios.post("http://localhost:3000/api/post/bestSellers", {
  //         books: bestSellers,
  //       });
  //     } catch (error) {
  //       // console.error("데이터 전송 중 오류 발생:", error);
  //     }
  //   })

  //   // 에러 처리: 크롤링 도중 에러가 발생한 경우
  //   .catch((error) => {
  //     // console.error("크롤링 도중 에러 발생:", error);
  //   });

  // // --------------------------------------베스트셀러2-----------------------------------------

  // // axios HTTP 요청
  // await axios
  //   .get(aladinBestSellerURL2)
  //   .then((response) => {
  //     // 요청 결과 상태가 정상일 경우
  //     if (response.status === 200) {
  //       // HTML 데이터 변수
  //       const html = response.data;
  //       // cheerio를 사용하여 HTML 데이터를 분석 및 추출하기 쉽도록 처리
  //       const $ = cheerio.load(html);

  //       // 각 베스트셀러 책 아이템에 대해 작업
  //       $(".ss_book_box").each((index, element) => {
  //         // 책 제목 추출
  //         const title = $(element).find(".bo3 > b").text();
  //         // 저자 추출
  //         const author = $(element)
  //           .find(".ss_book_list ul li:eq(2) > a:eq(0)")
  //           .text();
  //        // 링크 추출
  //   let link = $(element)
  //   .find(".ss_book_list ul li:eq(1) > a:eq(0)")
  //   .attr("href");
  // if (link.includes("Search")) {
  //   link = $(element)
  //     .find(".ss_book_list ul li:eq(0) > a:eq(0)")
  //     .attr("href");
  // }
  //         // 이미지 추출
  //         let imageUrl = $(element).find(".front_cover").attr("src");
  //         // 추출한 정보를 배열에 추가
  //         bestSellers.push({
  //           index: index + 51,
  //           title,
  //           author,
  //           link,
  //           imageUrl,
  //         });
  //       });
  //     }
  //   })
  //   .then(async () => {
  //     try {
  //       // 베스트셀러 정보 배열 전체를 서버에 전달
  //       await axios.post("http://localhost:3000/api/post/bestSellers", {
  //         books: bestSellers,
  //       });
  //     } catch (error) {
  //       console.error("데이터 전송 중 오류 발생:", error);
  //     }
  //   })

  //   // 에러 처리: 크롤링 도중 에러가 발생한 경우
  //   .catch((error) => {
  //     console.error("크롤링 도중 에러 발생:", error);
  //   });

  // // --------------------------------------스테디셀러-----------------------------------------

  // // axios HTTP 요청
  // await axios
  //   .get(aladinSteadySellerURL)
  //   .then((response) => {
  //     // 요청 결과 상태가 정상일 경우
  //     if (response.status === 200) {
  //       // HTML 데이터 변수
  //       const html = response.data;
  //       // cheerio를 사용하여 HTML 데이터를 분석 및 추출하기 쉽도록 처리
  //       const $ = cheerio.load(html);

  //       // 각 스테디셀러 책 아이템에 대해 작업
  //       $(".ss_book_box").each((index, element) => {
  //         // 책 제목 추출
  //         const title = $(element).find(".bo3 > b").text();
  //         // 저자 추출
  //         const author = $(element)
  //           .find(".ss_book_list ul li:eq(2) > a:eq(0)")
  //           .text();
  //        // 링크 추출
  //   let link = $(element)
  //   .find(".ss_book_list ul li:eq(1) > a:eq(0)")
  //   .attr("href");
  // if (link.includes("Search")) {
  //   link = $(element)
  //     .find(".ss_book_list ul li:eq(0) > a:eq(0)")
  //     .attr("href");
  // }
  //         // 이미지 추출
  //         let imageUrl = $(element).find(".front_cover.i_cover").attr("src");
  //         // 추출한 정보를 배열에 추가
  //         steadySellers.push({
  //           index: index + 1,
  //           title,
  //           author,
  //           link,
  //           imageUrl,
  //         });
  //       });
  //     }
  //   })
  //   .then(async () => {
  //     try {
  //       // 스테디셀러 정보 배열 전체를 서버에 전달
  //       await axios.post("http://localhost:3000/api/post/steadySellers", {
  //         books: steadySellers,
  //       });
  //     } catch (error) {
  //       console.error("데이터 전송 중 오류 발생:", error);
  //     }
  //   })

  //   // 에러 처리: 크롤링 도중 에러가 발생한 경우
  //   .catch((error) => {
  //     console.error("크롤링 도중 에러 발생:", error);
  //   });

  // // --------------------------------------스테디셀러2-----------------------------------------

  // // axios HTTP 요청
  // await axios
  //   .get(aladinSteadySellerURL2)
  //   .then((response) => {
  //     // 요청 결과 상태가 정상일 경우
  //     if (response.status === 200) {
  //       // HTML 데이터 변수
  //       const html = response.data;
  //       // cheerio를 사용하여 HTML 데이터를 분석 및 추출하기 쉽도록 처리
  //       const $ = cheerio.load(html);

  //       // 각 스테디셀러 책 아이템에 대해 작업
  //       $(".ss_book_box").each((index, element) => {
  //         // 책 제목 추출
  //         const title = $(element).find(".bo3 > b").text();
  //         // 저자 추출
  //         const author = $(element)
  //           .find(".ss_book_list ul li:eq(2) > a:eq(0)")
  //           .text();
  //        // 링크 추출
  //   let link = $(element)
  //   .find(".ss_book_list ul li:eq(1) > a:eq(0)")
  //   .attr("href");
  // if (link.includes("Search")) {
  //   link = $(element)
  //     .find(".ss_book_list ul li:eq(0) > a:eq(0)")
  //     .attr("href");
  // }
  //         // 이미지 추출
  //         let imageUrl = $(element).find(".front_cover.i_cover").attr("src");
  //         // 추출한 정보를 배열에 추가
  //         steadySellers.push({
  //           index: index + 51,
  //           title,
  //           author,
  //           link,
  //           imageUrl,
  //         });
  //       });
  //     }
  //   })
  //   .then(async () => {
  //     try {
  //       // 스테디셀러 정보 배열 전체를 서버에 전달
  //       await axios.post("http://localhost:3000/api/post/steadySellers", {
  //         books: steadySellers,
  //       });
  //     } catch (error) {
  //       console.error("데이터 전송 중 오류 발생:", error);
  //     }
  //   })

  //   // 에러 처리: 크롤링 도중 에러가 발생한 경우
  //   .catch((error) => {
  //     console.error("크롤링 도중 에러 발생:", error);
  //   });

  // for (let i = 0; i < 50; i++) {
  //   await axios
  //     .get(result[i].link)
  //     .then((response) => {
  //       // 요청 결과 상태가 정상일 경우
  //       if (response.status === 200) {
  //         // HTML 데이터 변수
  //         const html = response.data;
  //         // cheerio를 사용하여 HTML 데이터를 분석 및 추출하기 쉽도록 처리
  //         const $ = cheerio.load(html);

  //         // 각 베스트셀러 책 아이템에 대해 작업
  //         $(".Ere_prod_middlewrap").each((index, element) => {
  //           // 주제 추출
  //           const topic = $(element)
  //             .find(".conts_info_list2 ul li:eq(0) > a:eq(1)")
  //             .text();

  //           // 책소개 추출
  //           const element2 = $(element)
  //             .find('.Ere_prod_mconts_LS:contains("책소개")')
  //             .parent();
  //           const intro = element2
  //             .find(".Ere_prod_mconts_R > div")
  //             .text()
  //             .trim();

  //           // 추출한 정보를 배열에 추가
  //           detail.push({
  //             title,
  //             author,
  //             topic,
  //             intro,
  //           });
  //         });
  //       }
  //     })
  //     .then(async () => {
  //       try {
  //         // 상세정보 배열 전체를 서버에 전달
  //         await axios.post("http://localhost:3000/api/post/detail", {
  //           detail: detail,
  //         });
  //       } catch (error) {
  //         console.log("33");
  //         // console.error("데이터 전송 중 오류 발생:", error);
  //       }
  //     })

  //     // 에러 처리: 크롤링 도중 에러가 발생한 경우
  //     .catch((error) => {
  //       console.log("44");
  //       // console.error("크롤링 도중 에러 발생:", error);
  //     });
  // }

  // // --------------------------------------상세정보-----------------------------------------
  const db = (await connectDB).db("books");
  let result = await db.collection("bestSellers").find().toArray();
  console.log(result);
  for (let i; i < 50; i++) {
    // axios HTTP 요청
    await axios
      .get(result[i].link)
      .then((response) => {
        // 요청 결과 상태가 정상일 경우
        if (response.status === 200) {
          // HTML 데이터 변수
          const html = response.data;
          // cheerio를 사용하여 HTML 데이터를 분석 및 추출하기 쉽도록 처리
          const $ = cheerio.load(html);

          // 이미지 추출
          let backImageUrl = $(".cover").find(".c_back > img").attr("src");
          console.log(backImageUrl);
          // 추출한 정보를 배열에 추가
          bestSellers.push({
            backImageUrl,
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

  return <HomeCategory data={result} />;
}
