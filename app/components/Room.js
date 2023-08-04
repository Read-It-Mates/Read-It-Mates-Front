"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Room({ data }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [result, setResult] = useState([]); // 결과 데이터 상태
  const itemsPerPage = 7; // 페이지 당 표시되는 항목 수
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchOption, setSearchOption] = useState("board"); // 검색 옵션 상태 (기본값: "board")

  // 검색 값이 변경될 때 상태를 업데이트하는 이벤트 핸들러
  const handleSearchOptionChange = (event) => {
    setSearchOption(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 기능에서 enter를 누른경우
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  // 검색 기능을 구현하는 함수
  const search = () => {
    const filteredResult = data.filter((item) => {
      switch (searchOption) {
        case "board":
          return item.roomTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "title":
          return item.bookTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "genre":
          return item.category.toLowerCase().includes(searchTerm.toLowerCase());
        default:
          return true;
      }
    });
    setResult(filteredResult);
  };

  // 페이지 변경에 따른 데이터 변경
  useEffect(() => {
    setResult(data);
  }, []);

  // 페이지 관련 변수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 시 실행되는 함수
  const changePage = (pageNumber) => {
    const totalPages = Math.ceil(result.length / itemsPerPage);

    // 페이지 번호가 유효한 범위 내에 있는지 확인
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // 유효하지 않으면 함수를 종료
    }

    setCurrentPage(pageNumber);
  };

  // 참여하기 버튼을 누르는 경우
  const moveLocation = (id) => {
    window.location.href = `/readingRoom/${id}`;
  };

  return (
    // 리딩룸 게시판
    <div className="mates-container">
      <div className="mates-board-container">
        <div className="mates-board">
          <div className="mates-board-column">번호</div>
          <div className="mates-board-column">방 제목</div>
          <div className="mates-board-column">책 제목</div>
          <div className="mates-board-column">장르</div>
          <div className="mates-board-column">인원</div>
          <div className="mates-board-btn">
            <div className="mates-board-column2">참여하기</div>
          </div>
          {currentItems.map((item, index) => {
            return (
              <>
                <div className="mates-board-num">
                  <h4>{item.index}</h4>
                </div>
                <div className="mates-board-name">
                  <h4>{item.roomTitle}</h4>
                </div>
                <div className="mates-board-title">
                  <h4>{item.bookTitle}</h4>
                </div>
                <div className="mates-board-genre">
                  <h4>{item.category}</h4>
                </div>
                <div className="mates-board-number">
                  <h4>0/{item.participants.length}</h4>
                </div>
                <div
                  className="mates-board-btn"
                  onClick={() => moveLocation(item._id)}
                >
                  <h4>참여하기</h4>
                </div>
              </>
            );
          })}
        </div>
        <div className="mates-board-bottom">
          <div className="search-container2">
            <input
              className="search-input2"
              type="text"
              placeholder="검색"
              onChange={handleSearchInputChange}
            />
            <div className="search-options-container">
              <select
                className="search-options"
                name="search-option"
                onChange={handleSearchOptionChange}
              >
                <option value="title" selected>
                  책 제목
                </option>
                <option value="board">방 제목</option>
                <option value="genre">장르</option>
              </select>
            </div>
          </div>
          <div className="mates-board-page">
            <span onClick={() => changePage(currentPage - 1)}>left</span>
            {Array.from(
              { length: Math.ceil(result.length / itemsPerPage) },
              (_, i) => (
                <span
                  key={i + 1}
                  className={i + 1 === currentPage ? "active" : ""}
                  onClick={() => changePage(i + 1)}
                >
                  {i + 1}
                </span>
              )
            )}
            <span onClick={() => changePage(currentPage + 1)}>right</span>
          </div>
          <div className="search-container">
            <input
              className="search-input2"
              type="text"
              placeholder="검색"
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
            <div className="search-options-container">
              <select
                className="search-options"
                name="search-option"
                onChange={handleSearchOptionChange}
              >
                <option value="title" selected>
                  책 제목
                </option>
                <option value="board">방 제목</option>
                <option value="genre">장르</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mates-number-container">
        <div className="mates-number">
          <h4>전체: 357명</h4>
          <h4>온라인: 192명</h4>
          <h4>오프라인: 165명</h4>
        </div>
        <div className="mates-open-btn-container">
          <Link href="/makeRoom">
            <button className="mates-open-btn">방 만들기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
