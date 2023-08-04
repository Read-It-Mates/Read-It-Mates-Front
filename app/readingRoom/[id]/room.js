"use client";
import React, { useState, useEffect } from "react";
import { TbDirectionHorizontal } from "react-icons/tb";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
export default function Room({ data, session }) {
  const [message, setMessage] = useState(""); // 입력메시지
  const [chat, setChat] = useState([]); //메시지 배열
  const [showInfo, setShowInfo] = useState(true); //책정보와 참여자목록을 전환하는 state
  const [sidebarHidden, setSidebarHidden] = useState(false); // 사이드바 숨김 여부 설정
  const [isFullScreen, setIsFullScreen] = useState(true); // 전체화면 상태
  const [maxIndex, setMaxIndex] = useState(-1); // 참여자 인원 상태

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
              <h2>책 정보</h2>
            ) : (
              <h2>참여자 목록&nbsp;({maxIndex + 1}명)</h2>
            )}
          </div>
          {showInfo ? (
            <div className="bookInfo">
              <p>{data.roomTitle}</p>
              <p>책제목: {data.bookTitle}</p>
              <p>분야: {data.category}</p>
              <p>저자: {data.author}</p>
              <img className="coverImage4" src={data.image} alt="이미지"></img>
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
