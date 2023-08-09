"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [bookTitle, setBookTitle] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIntro, setSelectedIntro] = useState("");
  const [bookSuggestions, setBookSuggestions] = useState([]);
  const router = useRouter();
  const [isMoving, setIsMoving] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSuggestions = () => {
    setIsMoving(true);
  };

  useEffect(() => {
    if (isMoving) {
      router.push(
        `/searchPage?title=${bookTitle}&author=${selectedAuthor}&category=${selectedCategory}&image=${selectedImage}&intro=${selectedIntro}`
      );
      setIsMoving(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // 새로고침이 1초 후 실행되도록
    }
  }, [
    isMoving,
    bookTitle,
    selectedAuthor,
    selectedCategory,
    selectedImage,
    selectedIntro,
  ]);

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

  useEffect(() => {
    const searchInput = document.querySelector(".search-input");

    function handleFocus() {
      const audio = new Audio("/search.mp3");
      audio.play();
    }

    searchInput.addEventListener("focus", handleFocus);

    return () => {
      searchInput.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div className="navbar-l">
      <Link href="/">
        <img src="/logo3.png" className="logo"></img>
      </Link>
      <input
        className="search-input"
        type="text"
        placeholder="도서검색"
        value={bookTitle}
        onChange={(event) => setBookTitle(event.target.value)}
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
      />
      {bookSuggestions.length > 0 && focused && (
        <ul id="suggestions2">
          {bookSuggestions.map((book) => (
            <li
              key={book._id}
              onClick={() => {
                setBookTitle(book.title);
                setSelectedAuthor(book.author); // 선택된 책의 저자로 설정.
                setSelectedCategory(book.category); // 선택된 책의 카테고리로 설정.
                setSelectedImage(book.image); // 선택된 책의 이미지 주소로 설정.
                setSelectedIntro(book.intro); // 선택된 책의 인트로로 설정.
                setBookSuggestions([]); // 선택된 데이터 처리 후 목록을 지움.
                handleSuggestions(); // 핸들러 함수 실행.
              }}
            >
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
