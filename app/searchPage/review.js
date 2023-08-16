"use client";
import React, { useState, useEffect, useRef } from "react";

// queryParams 가져오기
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
  const [queryParams, setQueryParams] = useState({});

  // queryParams 설정하기
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
  const [result, setResult] = useState([]); // 저장된 리뷰 상태

  // 리뷰 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/post/reviewList?title=${title}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setResult([]);
            throw new Error("리뷰를 찾을 수 없습니다.");
          }
        })
        .then((data) => setResult(data))
        .catch((error) => console.error("Error fetching API:", error));
    };

    fetchData();
  }, [title]);

  // 실시간 리뷰 상태
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  // 리뷰 입력 함수
  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  // 리뷰 추가 함수
  const handleButtonClick = async (event) => {
    if (commentText.trim() !== "") {
      const newComment = {
        author: [session.user.name],
        text: [commentText],
        title: title,
      };
      setComments([...comments, newComment]);
      setCommentText("");

      await fetch("/api/post/review", {
        method: "POST",
        body: JSON.stringify(newComment),
      });
    }
    event.preventDefault();
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  // 리뷰 입력 enter keyDown 함수
  const handleInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleButtonClick(e);
    }
  };

  // 스크롤 바 ref
  const scrollRef = useRef(null);

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
          <ul className="comment-list" ref={scrollRef}>
            {/* 불러온 리뷰 데이터 */}
            {result.map((comment, index) => (
              <li key={index}>
                {comment.author.map((author, i) => (
                  <div className="comment" key={i}>
                    <p className="comment-author">{author}</p>
                    <p className="comment-text">{comment.text[i]}</p>
                  </div>
                ))}
              </li>
            ))}
            {/* 실시간 리뷰 데이터 */}
            {comments.map((comment, index) => (
              <li key={index}>
                <div className="comment">
                  <p className="comment-author">{comment.author[0]}:</p>
                  <p className="comment-text">{comment.text[0]}</p>
                </div>
              </li>
            ))}
          </ul>

          <input
            className="comment-input"
            placeholder="여기에 리뷰를 남겨주세요..."
            value={commentText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          ></input>
          <button className="comments-submit-btn" onClick={handleButtonClick}>
            리뷰 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
