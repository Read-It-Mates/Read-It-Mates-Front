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

export default function Review({ session }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleButtonClick = async () => {
    if (commentText.trim() !== "") {
      const newComment = {
        author: session.user.name, // 변경 가능, 예를 들면 로그인한 사용자 이름
        text: commentText,
        title: title,
      };
      setComments([...comments, newComment]);
      setCommentText("");

      await fetch("/api/post/review", {
        method: "POST",
        body: JSON.stringify(newComment),
      });
    }
  };

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

      <div className="vertical-line"></div>

      <div className="comments-section">
        <div>
          <h2 className="comments-title">리뷰 남기기</h2>
        </div>
        <div>
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment">
                <p className="comment-author">{comment.author}</p>
                <p className="comment-text">{comment.text}</p>
              </li>
            ))}
          </ul>

          <input
            className="comment-input"
            placeholder="여기에 리뷰를 남겨주세요..."
            value={commentText}
            onChange={handleInputChange}
          ></input>
          <button className="comments-submit-btn" onClick={handleButtonClick}>
            리뷰 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
