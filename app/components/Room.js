"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export default function Room({ data, session }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [result, setResult] = useState([]); // 결과 데이터 상태
  const itemsPerPage = 7; // 페이지 당 표시되는 항목 수
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchOption, setSearchOption] = useState("title"); // 검색 옵션 상태
  const [myRoomToggled, setMyRoomToggled] = useState(false); // 내 리딩룸 토글 상태

  // 내가 속한 리딩룸 기능을 구현하는 함수
  const myRoom = () => {
    if (!session) {
      window.confirm("로그인 후 이용해주세요");
      return;
    }

    if (!myRoomToggled) {
      const myRooms = data.filter((item) => {
        return item.participants.includes(session.user.name);
      });

      setResult(myRooms);
      setMyRoomToggled(true);
    } else {
      setResult(data);
      setMyRoomToggled(false);
    }
  };

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
    if (session == null) {
      window.confirm("로그인 후 이용해주세요.");
    } else {
      window.location.href = `/readingRoom/${id}`;
    }
  };

  // 리딩룸 랜덤함수
  const [recommendedRoom, setRecommendedRoom] = useState(null);

  useEffect(() => {
    const shuffledRooms = data.slice().sort(() => Math.random() - 0.5);
    setRecommendedRoom(shuffledRooms[0]);
  }, [data]);

  // 정렬 상태
  const [numSortState, setNumSortState] = useState(false);
  const [roomSortState, setRoomSortState] = useState(false);
  const [bookSortState, setBookSortState] = useState(false);
  const [genreSortState, setGenreSortState] = useState(false);
  const [peopleSortState, setPeopleSortState] = useState(false);

  // 방 제목 정렬 함수
  const roomSort = () => {
    const sortedResult = !roomSortState
      ? data.slice().sort((a, b) => a.roomTitle.localeCompare(b.roomTitle))
      : data.slice().sort((a, b) => b.roomTitle.localeCompare(a.roomTitle));

    setResult(sortedResult);
    setRoomSortState(!roomSortState);
  };

  // 책 제목 정렬 함수
  const bookSort = () => {
    const sortedResult = !bookSortState
      ? data.slice().sort((a, b) => a.bookTitle.localeCompare(b.bookTitle))
      : data.slice().sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));

    setResult(sortedResult);
    setBookSortState(!bookSortState);
  };

  // 장르 정렬 함수
  const genreSort = () => {
    const sortedResult = !genreSortState
      ? data.slice().sort((a, b) => a.category.localeCompare(b.category))
      : data.slice().sort((a, b) => b.category.localeCompare(a.category));

    setResult(sortedResult);
    setGenreSortState(!genreSortState);
  };

  // 참여자 정렬 함수
  const peopleSort = () => {
    const sortedResult = !peopleSortState
      ? data
          .slice()
          .sort((a, b) => a.participants.length - b.participants.length)
      : data
          .slice()
          .sort((a, b) => b.participants.length - a.participants.length);

    setResult(sortedResult);
    setPeopleSortState(!peopleSortState);
  };

  return (
    // 리딩룸 게시판
    <div className="mates-container">
      <div className="mates-board-container">
        <div className="mates-board">
          <div className="mates-board-column">번호</div>
          <div className="mates-board-column">
            방 제목&nbsp;
            <span className="sortBtn" onClick={roomSort}>
              {roomSortState ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
            </span>
          </div>
          <div className="mates-board-column">
            책 제목&nbsp;
            <span className="sortBtn" onClick={bookSort}>
              {bookSortState ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
            </span>
          </div>
          <div className="mates-board-column">
            장르&nbsp;
            <span className="sortBtn" onClick={genreSort}>
              {genreSortState ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
            </span>
          </div>
          <div className="mates-board-column">
            참여자&nbsp;
            <span className="sortBtn" onClick={peopleSort}>
              {peopleSortState ? <TiArrowSortedDown /> : <TiArrowSortedUp />}
            </span>
          </div>
          <div className="mates-board-btn">
            <div className="mates-board-column2">참여하기</div>
          </div>
          {currentItems.map((item, index) => {
            return (
              <>
                <div className="mates-board-num">
                  <h4>{indexOfFirstItem + index + 1}</h4>
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
                  <h4>{item.participants.length}명</h4>
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
          {recommendedRoom && (
            <>
              <h3>추천 도서</h3>
              <h4>{recommendedRoom.bookTitle}</h4>
              <img
                className="coverImage5"
                src={recommendedRoom.image}
                alt=""
              ></img>
            </>
          )}
        </div>
        <div className="mates-open-btn-container">
          <button className="mates-open-btn" onClick={myRoom}>
            내 리딩룸
          </button>
          <Link href="/makeRoom">
            <button className="mates-open-btn">방 만들기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
