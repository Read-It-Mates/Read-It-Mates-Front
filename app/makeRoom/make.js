"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Make({ session }) {
  const [roomTitle, setRoomTitle] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookSuggestions, setBookSuggestions] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const newPost = {
    roomTitle: roomTitle,
    bookTitle: bookTitle,
    author: selectedAuthor,
    image: selectedImageUrl,
    category: selectedCategory,
    participants: [session.user.name],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (bookTitle) {
        fetch(`/api/post/titleSearch?term=${encodeURIComponent(bookTitle)}`)
          .then((response) => response.json())
          .then((books) => {
            setBookSuggestions(books);
          })
          .catch((error) => {});
      } else {
        setBookSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [bookTitle]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 개설하기 버튼 클릭시 서버에 데이터를 보내고 리딩룸을 띄우는 작업.
    const response = await fetch("/api/post/room", {
      method: "POST",
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      console.log("실행중입니다??");
      console.log(
        roomTitle +
          "-" +
          bookTitle +
          "-" +
          selectedAuthor +
          "-" +
          selectedCategory
      );
      const id = await response.json();
      const width = window.innerWidth * 0.9;
      const height = window.innerHeight * 0.9;
      // Axios를 사용하여 데이터를 스프링 서버로 전달합니다.
      axios
        .post("/readit/reading/room", {
          roomTitle: roomTitle,
          bookTitle: bookTitle,
          bookWriter: selectedAuthor,
          bookImg: selectedImageUrl,
          category: selectedCategory,
          hostId: session.user.name,
        })
        .then((response) => {
          console.log("서버 응답:", response.data);
          // 서버로부터의 응답에 따라 처리할 로직을 추가합니다.
          window.location.href = `/readingRoom/${id}`;
        })
        .catch((error) => {
          console.error("에러 발생!!!:", error);
          // 에러 처리 로직을 추가합니다.
        });
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <div>
      <form className="make-container" onSubmit={handleSubmit}>
        <h1>리딩룸 개설하기</h1>
        <div className="make-top">
          <div className="make-title">
            방 제목:
            <input
              type="text"
              id="roomTitle"
              value={roomTitle}
              onChange={(event) => setRoomTitle(event.target.value)}
              // placeholder="방 제목을 입력해주세요."
              autoComplete="off"
            />
          </div>
          <div className="make-title">
            책 제목:
            <input
              type="text"
              id="bookTitle"
              value={bookTitle}
              onChange={(event) => setBookTitle(event.target.value)}
              // placeholder="책 제목을 입력해주세요."
              autoComplete="off"
            />
          </div>
          {bookSuggestions.length > 0 && (
            <ul id="suggestions">
              {bookSuggestions.slice(0, 10).map((book) => (
                <li
                  key={book._id}
                  onClick={() => {
                    setBookTitle(book.title);
                    setSelectedAuthor(book.author); // 저자를 선택된 책의 저자로 설정.
                    setSelectedCategory(book.category); // 카테고리를 선택된 책의 카테고리로 설정.
                    setSelectedImageUrl(book.image); // 이미지 주소를 선택된 책의 이미지 주소로 설정.
                    setBookSuggestions([]); // 선택된 데이터 처리 후 목록을 지움.
                  }}
                >
                  {book.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* 작성한 장르, 이미지, 저자 값 대입 */}
        <div className="book-info">
          <div className="make-selected">
            <div>{selectedAuthor ? "저자: " + selectedAuthor : null}</div>
            <div>{selectedCategory ? "장르: " + selectedCategory : null} </div>
          </div>
          <p>
            {selectedImageUrl ? (
              <img
                className="coverImage3"
                src={selectedImageUrl}
                alt="책 표지"
              />
            ) : null}
          </p>
        </div>

        <div className="make-button">
          <input type="submit" value="개설하기" />
        </div>
      </form>
    </div>
  );
}
