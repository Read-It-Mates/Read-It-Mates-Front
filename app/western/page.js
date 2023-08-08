"use client";

import React, { useState, useEffect, useCallback } from "react";
import Grid from "../components/grid";

export default function Western() {
  const [result, setResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("종합");

  const categories = [
    "종합",
    "ELT/사전",
    "문학/소설",
    "경제/경영",
    "인문/사회",
    "예술/대중문화",
    "취미/라이프",
    "컴퓨터",
    "자연과학",
    "대학교재/전문서",
    "해외잡지",
    "유아/어린이",
    "캐릭터북",
    "초등코스북",
    "학습서",
  ];

  const fetchBooksByCategory = useCallback(async () => {
    const response = await fetch(
      `/api/post/category2?selectedCategory=${selectedCategory}`
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
