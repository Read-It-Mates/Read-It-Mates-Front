"use client";

import React, { useState, useEffect, useCallback } from "react";
import Grid from "../components/grid";

export default function Japanese() {
  const [result, setResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("종합");

  const categories = [
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
    "엔터테이먼트",
    "문고/신서",
  ];

  const fetchBooksByCategory = useCallback(async () => {
    const response = await fetch(
      `/api/post/category3?selectedCategory=${selectedCategory}`
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
