"use client";

import React, { useState, useEffect, useCallback } from "react";
import Grid from "../components/grid";

export default function Japanese() {
  const [result, setResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("종합");

  const categories = [
    "종합",
    "라이트노벨",
    "만화/애니/피규어",
    "문학",
    "실용서",
    "엔터테이먼트",
    "유아/어린이",
    "일반과학",
    "일반사회",
    "일본잡지",
    "컴퓨터",
    "학습",
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
