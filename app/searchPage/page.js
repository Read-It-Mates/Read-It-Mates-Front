"use client";
import React, { useState, useEffect } from "react";

function getQueryParams() {
  if (typeof window === "undefined") {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);
  return {
    title: searchParams.get("title") || "",
    author: searchParams.get("author") || "",
    category: searchParams.get("category") || "",
    image: searchParams.get("image") || "",
    intro: searchParams.get("intro") || "",
  };
}

export default function SearchPage() {
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    setQueryParams(getQueryParams());

    const handlePopState = () => {
      setQueryParams(getQueryParams());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const { title, author, category, image, intro } = queryParams;

  if (!title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-container3">
      <div className="search-content">
        <h1 className="search-title">{title}</h1>
        <p className="search-author">저자: {author}</p>
        <p className="search-category">분류: {category}</p>
        <img className="search-image" src={image} alt={title} />
        <p className="search-intro">{intro}&nbsp;(생략)</p>
      </div>
    </div>
  );
}
