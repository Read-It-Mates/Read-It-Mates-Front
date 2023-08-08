"use client";

import React, { useState, useEffect, useCallback } from "react";
import Grid from "../components/grid";

export default function Domestic() {
  const [result, setResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("종합");

  const categories = [
    "종합",
    "가정/살림",
    "건강/취미",
    "경제/경영",
    "국어/외국어",
    "대학교재",
    "만화/라이트노벨",
    "사회/정치",
    "소설/시/희곡",
    "수험서/자격증",
    "어린이",
    "에세이",
    "여행",
    "역사",
    "예술",
    "유아",
    "인문",
    "인물",
    "자기계발",
    "자연과학",
    "잡지",
    "전집",
    "종교",
    "청소년",
    "IT/모바일",
    "초등학생",
    "중/고등학생",
  ];

  const fetchBooksByCategory = useCallback(async () => {
    const response = await fetch(
      `/api/post/category?selectedCategory=${selectedCategory}`
    );
    const newResult = await response.json();
    setResult(newResult);
  }, [selectedCategory]);

  useEffect(() => {
    fetchBooksByCategory();
  }, [fetchBooksByCategory]);

  return (
    <>
      <Grid
        result={result}
        categories={categories}
        onCategoryChange={setSelectedCategory}
      />
    </>
  );
}
