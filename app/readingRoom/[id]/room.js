"use client";
import React, { useState, useEffect } from "react";
import { TbDirectionHorizontal } from "react-icons/tb";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import DeleteModal from "@/app/components/deleteModal";
import { useRouter } from "next/navigation";

export default function Room({ data, session }) {
  const [message, setMessage] = useState(""); // 입력메시지
  const [chat, setChat] = useState([]); //메시지 배열
  const [showInfo, setShowInfo] = useState(true); //책정보와 참여자목록을 전환하는 state
  const [sidebarHidden, setSidebarHidden] = useState(false); // 사이드바 숨김 여부 설정
  const [isFullScreen, setIsFullScreen] = useState(true); // 전체화면 상태
  const [maxIndex, setMaxIndex] = useState(-1); // 참여자 인원 상태
  const [isEditMode, setIsEditMode] = useState(false); // 수정모드 상태
  const [roomTitle, setRoomTitle] = useState(data.roomTitle);
  const [bookTitle, setBookTitle] = useState(data.bookTitle);
  const [bookSuggestions, setBookSuggestions] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(data.author);
  const [selectedCategory, setSelectedCategory] = useState(data.category);
  const [selectedImageUrl, setSelectedImageUrl] = useState(data.image);
  const [focused, setFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const idPost = {
    _id: data._id,
  };

  // 리딩룸 삭제 함수
  const onDelete = async () => {
    await fetch("/api/post/roomDelete", {
      method: "POST",
      body: JSON.stringify(idPost),
    });
    router.push("/");
  };

  // 리딩룸 수정시 변경값
  const newPost = {
    roomTitle: roomTitle,
    bookTitle: bookTitle,
    author: selectedAuthor,
    image: selectedImageUrl,
    category: selectedCategory,
    _id: data._id,
  };

  // 리딩룸 수정 함수
  const handleUpdate = async () => {
    await fetch("/api/post/roomUpdate", {
      method: "POST",
      body: JSON.stringify(newPost),
    });
    window.location.reload();
  };

  // 방 수정시 책 목록 띄우는 함수
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

  // 참여자 인원 상태 함수
  useEffect(() => {
    if (data && data.participants) {
      setMaxIndex(data.participants.length - 1);
    }
  }, [data]);

  // 사이드바 숨김 여부 함수
  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  // 책 정보와 참여자 목록을 전환하는 함수
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // 메시지를 전송하고 입력창을 초기화하는 함수
  const sendMessage = (e) => {
    e.preventDefault();

    // 메시지에 내용이 포함되어 있다면
    if (message.length > 0) {
      setChat([...chat, { message }]); // 채팅에 메시지 추가
      setMessage(""); // 입력창 초기화
    }
  };

  // 전체화면에서 esc를 누른경우
  const handleFullScreenChange = () => {
    setIsFullScreen(!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  // 전체화면 및 축소화면 변경 함수
  const toggleFullScreen = () => {
    const readingRoomDiv = document.querySelector(".readingRoom");

    if (!document.fullscreenElement) {
      readingRoomDiv.requestFullscreen().catch(console.error);
      setIsFullScreen(false);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  return (
    <div className="readingRoom">
      <div
        className="chatSpace"
        style={{ width: sidebarHidden ? "98.5%" : "80%" }}
      >
        <div className="fullScreenButton-container">
          <button onClick={toggleFullScreen} className="fullScreenButton">
            {isFullScreen ? (
              <AiOutlineFullscreen size={"2rem"} />
            ) : (
              <AiOutlineFullscreenExit size={"2rem"} />
            )}
          </button>
        </div>
        <ul className="chatList">
          {chat.map((msg, index) => (
            <li key={index} className="chatMessage">
              <div className="messageBubble">{msg.message}</div>
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessage} className="messageForm">
          <input
            type="text"
            className="messageInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button type="submit" className="submitButton">
            전송
          </button>
        </form>
      </div>
      {!sidebarHidden && (
        <div className="room-sidebar">
          <div className="room-sidebar-btn">
            <h4 onClick={toggleSidebar} className="sidebar-btn">
              <GrFormClose size={"2rem"} />
            </h4>
            <button onClick={toggleInfo} className="toggleButton">
              {showInfo ? "참여자 목록 보기" : "책 정보 보기"}
            </button>
          </div>
          <div className="room-header">
            {showInfo ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h2>책 정보</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h4
                    className="toggleButton2"
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    변경
                  </h4>
                  &nbsp;
                  <h4 className="toggleButton2" onClick={onDelete}>
                    삭제
                  </h4>
                  <DeleteModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={onDelete}
                  />
                </div>
              </div>
            ) : (
              <h2>참여자 목록&nbsp;({maxIndex + 1}명)</h2>
            )}
          </div>
          {showInfo ? (
            <div className="bookInfo">
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    id="roomTitle"
                    value={roomTitle}
                    onChange={(event) => setRoomTitle(event.target.value)}
                    autoComplete="off"
                    className="big-Category"
                    placeholder="방 제목을 입력해주세요."
                  />
                  <div className="bookTitleWrapper">
                    <span className="span-Category">책제목: </span>
                    <input
                      type="text"
                      id="bookTitle"
                      value={bookTitle}
                      onChange={(event) => setBookTitle(event.target.value)}
                      autoComplete="off"
                      className="small-Category"
                      placeholder="책 제목을 입력해주세요."
                      onFocus={() => setFocused(true)}
                      onBlur={() => setTimeout(() => setFocused(false), 200)}
                    />

                    {bookSuggestions.length > 0 && focused && (
                      <ul id="suggestions3">
                        {bookSuggestions.map((book) => (
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
                  <p className="small-Category">분야: {selectedCategory}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="small-Category">
                      저자: {selectedAuthor}
                    </span>
                    <button onClick={handleUpdate} className="button-Category">
                      변경하기
                    </button>
                  </div>
                  <img
                    className="coverImage4"
                    src={selectedImageUrl}
                    alt="이미지"
                  ></img>
                </>
              ) : (
                <>
                  <span className="big-Category">{data.roomTitle}</span>
                  <span className="small-Category">
                    책제목: {data.bookTitle}
                  </span>
                  <span className="small-Category">분야: {data.category}</span>
                  <span className="small-Category">저자: {data.author}</span>
                  <img
                    className="coverImage4"
                    src={data.image}
                    alt="이미지"
                  ></img>
                </>
              )}
            </div>
          ) : (
            <div className="participantList">
              {data.participants.map((item, index) =>
                index === 0 ? (
                  <div
                    key={index}
                    className="participant"
                    style={{ width: "fit-content" }}
                  >
                    {item}&nbsp;
                    <span className="room-Leader">방장</span>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="participant"
                    style={{ width: "fit-content" }}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
      {sidebarHidden && (
        <div className="room-sidebar2" onClick={toggleSidebar}>
          <TbDirectionHorizontal size={"2rem"} />
        </div>
      )}
    </div>
  );
}
