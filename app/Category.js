"use client";
import React, { useState } from "react";
import Category_image from "./Category_image";

export default function Category({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("국내도서");

  const categories = {
    국내도서: [
      "종합",
      "건강/취미",
      "경제경영",
      "고전",
      "과학",
      "교재/서적",
      "만화",
      "달력/기타",
      "사회과학",
      "소설/시/희곡",
      "수험서/자격증",
      "어린이",
      "에세이",
      "여행",
      "역사",
      "예술/대중문화",
      "요리/살림",
      "외국어",
      "유아",
      "인문학",
      "자기계발",
      "장르소설",
      "잡지",
      "전집/중고전집",
      "종교/역학",
      "좋은부모",
      "청소년",
      "컴퓨터/모바일",
      "초등학교",
      "중학교",
      "고등학교",
    ],
    영미도서: [
      "종합",
      "ELT/어학/사전",
      "가정/원예/인테리어",
      "가족/관계",
      "건강/스포츠",
      "건축/디자인",
      "경제경영",
      "공예/취미/수집",
      "교육/자료",
      "기술공학",
      "달력/다이어리/연감",
      "만화",
      "법률",
      "소설/시/희곡",
      "수험서",
      "어린이",
      "언어학",
      "에세이",
      "여행",
      "역사",
      "예술/대중문화",
      "오디오북",
      "요리",
      "유머",
      "의학",
      "인문/사회",
      "자기계발",
      "과학/수학/생태",
      "전기/자서전",
      "종교/명상/점술",
      "청소년",
      "컴퓨터",
      "해외잡지",
    ],
    일본도서: [
      "종합",
      "경제/경영",
      "브랜드무크지",
      "애니메이션 굿즈",
      "어린이",
      "예술/건축/디자인",
      "외국어학습/교육",
      "이학/공학/컴퓨터",
      "인문/사회/논픽션",
      "일반",
      "자격/검정시험",
      "지브리 작품전",
      "캘린더",
      "CD/DVD",
      "문학",
      "일본잡지",
      "코믹/게임",
      "실용/취미/생활",
      "엔터테인먼트",
      "문고/신서",
    ],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="main-category-container">
        <div className="main-category-buttons">
          {/* 메인 카테고리 버튼들 구성 */}
          <button onClick={() => handleCategoryClick("국내도서")}>
            국내도서
          </button>
          <button onClick={() => handleCategoryClick("영미도서")}>
            영미도서
          </button>
          <button onClick={() => handleCategoryClick("일본도서")}>
            일본도서
          </button>
        </div>

        <div className="category-title">베스트셀러</div>
        <div className="category-container">
          <div className="button-container">
            {/* 선택된 카테고리에 따라 버튼을 화면에 표시 */}
            {categories[selectedCategory].map((item, index) => {
              return (
                <div key={index}>
                  <button className="category-button">{item}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Category_image data={data} />
    </div>
  );
}
