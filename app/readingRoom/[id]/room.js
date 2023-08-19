"use client";
import React, { useState, useEffect } from "react";
import { TbDirectionHorizontal } from "react-icons/tb";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import SockJS from "sockjs-client";
import axios from "axios";

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

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [enterRoom, setEnterRoom] = useState("test");
  const [loadChat, setLoadChat] = useState([]);

  const [userHost, setUserHost] = useState(data.participants[0]);
  const [userListCheck, setUserListCheck] = useState([]);
  const [enterUserList, setEnterUserList] = useState([]);

  const idPost = {
    _id: data._id,
  };

  // 리딩룸 삭제 함수
  const onDelete = async () => {
    const deleteRoom = window.confirm("방을 삭제하시겠습니까?");
    if (deleteRoom) {
      // 방장이 리딩룸을 삭제할 때, 서버 소켓에 리딩룸이 삭제된다는 것을 알려준다.
      const socketJson = {
        deletedRoom: data._id,
      };
      socket.send(JSON.stringify(socketJson));

      await fetch("/api/post/roomDelete", {
        method: "POST",
        body: JSON.stringify(idPost),
      });

      // 홈으로 이동
      router.push("/");
    }
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
    const modifyRoom = window.confirm("방을 수정하시겠습니까?");
    if (modifyRoom) {
      await fetch("/api/post/roomUpdate", {
        method: "POST",
        body: JSON.stringify(newPost),
      });
      router.refresh();
      setIsEditMode(false);
    }
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

  // 값이 변경될 때마다 콘솔에 출력하여 확인
  useEffect(() => {
    console.log("enterUserList 변경됨: ", enterUserList);
    console.log("data.participants 변경됨: " + data.participants);
    console.log("userHost 변경됨 " + userHost);
  }, [enterUserList, data.participants, userHost]);

  // [ socket 통신 부분 ]
  useEffect(() => {
    // data.participants 배열 안에 들어있는 방 참가자목록 확인
    console.log("{ " + data._id + " } 방 참가자 목록: " + data.participants);
    console.log("방장: " + userHost);

    // [axios] 방 채팅 내역 불러오기
    axios
      .post("/readit/socket/loadChat", {
        roomNm: data._id,
      })
      .then((response) => {
        console.log("[loadChat]서버 응답:", JSON.stringify(response.data));
        setLoadChat(response.data);
      })
      .catch((error) => {
        console.error("에러 발생!!!:", error);
        // 에러 처리 로직을 추가합니다.
      });

    // [socket] 앤드포인트에 맞는 서버와 각 소켓 연결 및 소켓 객체 생성
    const socket = new SockJS("http://localhost:12000/readit/user");
    setSocket(socket);
    console.log("소켓 객체 생성 완료");

    // [onopen] 서버 소켓과 연결여부 파악
    socket.onopen = () => {
      console.log(
        "서버 소켓과의 연결 여부: ",
        socket.readyState === SockJS.OPEN
      );
      // setMessages((prevMessages) => [...prevMessages, enterRoom]);

      // 자신을 참가자 목록에 추가
      if (!enterUserList.includes(session.user.name)) {
        console.log(
          "enterUserList 에 " + session.user.name + " 님을 추가합니다."
        );
        setEnterUserList([...enterUserList, session.user.name]);
      }

      // 서버 소켓에 보낼 데이터 세팅(방금 연결된 소켓의 닉네임 정보)
      const onOffCheck = {
        onCheck: session.user.name,
      };
      socket.send(JSON.stringify(onOffCheck));
    };

    // [onmessage] 서버 소켓에서 보낸 데이터 혹은 메시지를 수신
    socket.onmessage = (event) => {
      // json 형태의 데이터를 parse
      let message = JSON.parse(event.data);
      console.log("서버에서 받은 데이터: " + event.data);

      // 방에 접속한 사람(본인인지 다른 사람인지) 체크
      if (message.hasOwnProperty("onCheck")) {
        const enterUserNick = message.onCheck;
        console.log("[onCheck] 방에 접속한 닉네임: " + enterUserNick);
        console.log("본인 닉네임: " + session.user.name);
        console.log("enterUserList: " + enterUserList);

        // 방금 소켓 연결한 사람이 본인이 아니라면...
        if (enterUserNick !== session.user.name) {
          if (!enterUserList.includes(enterUserNick)) {
            // 상대방의 닉네임을 참여자 목록에 추가
            console.log(
              "enterUserList 에 " + enterUserNick + " 님을 추가합니다."
            );
            setEnterUserList((prevEnterUserList) => [
              ...prevEnterUserList,
              enterUserNick,
            ]);
          }

          // 방에 접속한 닉네임(본인)을 방에 있는 모든 소켓에게 보내기
          const connectUser = {
            enterUser: session.user.name,
          };
          socket.send(JSON.stringify(connectUser));

          // 새로고침
          router.refresh();
        }

        // 이미 들어온 사람과의 연결 확인을 위한 수신
      } else if (message.hasOwnProperty("enterUser")) {
        const enterUser = message.enterUser;
        console.log("enterUser: " + enterUser);

        // 이 메시지를 보낸 사람이 본인이 아니라면..
        if (enterUser !== session.user.name) {
          console.log("[enterUser] 연결된 닉네임: " + enterUser);

          if (!enterUserList.includes(enterUser)) {
            console.log(
              "enterUserList 에 " + enterUser + " 님을 추가했습니다."
            );
            setEnterUserList((prevEnterUserList) => [
              ...prevEnterUserList,
              enterUser,
            ]);
          }

          // 새로고침
          router.refresh();

          // setUserListCheck((prevUser) => [...prevUser, message.reCheck]);
        }
      } else if (message.hasOwnProperty("offUser")) {
        // 방을 벗어난 닉네임(offline)
        const offUser = message.offUser;
        console.log("[offUser] 방을 벗어난 유저 닉네임: " + offUser);

        // 페이지를 벗어날 때, 참여자 목록에서 삭제
        setEnterUserList((prevEnterUserList) =>
          prevEnterUserList.filter((user) => user !== offUser)
        );

        // html에 변화가 생길 시, 새로고침
        router.refresh();
      } else if (message.hasOwnProperty("leaveUser")) {
        // 방을 완전히 나간 닉네임
        const leaveUser = message.leaveUser;
        console.log("[leaveUser] 방을 완전히 나간 유저 닉네임: " + leaveUser);

        // 페이지를 벗어날 때, 참여자 목록에서 삭제
        setEnterUserList((prevEnterUserList) =>
          prevEnterUserList.filter((user) => user !== leaveUser)
        );

        // html에 변화가 생길 시, 새로고침
        router.refresh();

        // 강퇴 처리
      } else if (message.hasOwnProperty("kickNick")) {
        const kickNick = message.kickNick;
        console.log("[kickNick] 강퇴 당할 유저 닉네임: " + kickNick);

        // 강퇴 닉네임과 자신의 닉네임과 같다면..
        if (kickNick === session.user.name) {
          window.alert("강퇴당했습니다. 깨끗한 채팅 생활을 만들어요~");

          // 강퇴 알람을 받았다면, 소켓 종료 및 홈으로 이동
          if (alert) {
            // 페이지를 벗어날 때, 서버 소켓에 사용자의 상태를 서버에 알립니다.
            const kickCheck = {
              kickNick: kickNick,
            };
            socket.send(JSON.stringify(kickCheck));

            // 소켓 종료
            socket.close();
            // 몽고DB 에서 해당 닉네임을 갖고 있는 데이터 delete하기

            // 홈으로 보내기
            router.push("/");
          }
        } else {
          // 강퇴 당한 대상 외의 사람들이 받게 될 console.log
          console.log("[kickNick] 강퇴당한 닉네임 : " + kickNick);
          // 참여자 목록에서 강퇴당한 닉네임 삭제
          setEnterUserList((prevEnterUserList) =>
            prevEnterUserList.filter((user) => user !== kickNick)
          );
        }
      } else if (message.hasOwnProperty("leaderNick")) {
        // 방장 위임 받은 닉네임
        const leaderNick = message.leaderNick;
        console.log(leaderNick + " 님이 방장 위임 되셨습니다.");

        setUserHost(leaderNick);

        // 새로고침
        router.refresh();
      } else if (message.hasOwnProperty("deletedRoom")) {
        if (session.user.name !== userHost) {
          // 방장이 방을 삭제하고 나갔을 때
          window.alert("방장이 방을 폭파하였습니다.");

          // 홈으로 이동
          router.push("/");
        }
      } else {
        // 소켓에서 보낸 메시지를 채팅에 추가
        console.log("data: " + message.userNick);
        console.log("data: " + message.userChat);
        setChat((prevChats) => [...prevChats, message]); // 채팅에 메시지 추가
      }
    };

    // [eventListener] 사용자가 탭을 닫거나 다른 페이지로 이동할 때(unload) 반응
    window.addEventListener("beforeunload", () => {
      // 페이지를 벗어날 때, 서버 소켓에 사용자의 상태를 서버에 알립니다.
      const offUser = {
        offUser: session.user.name,
      };
      socket.send(JSON.stringify(offUser));

      // 내용 전송 후, 소켓 연결 종료
      socket.close();

      // 홈으로 보내기
      router.push("/");
    });

    // WebSocket 연결이 종료될 때 수행할 작업을 추가합니다.
    // socket.onclose = function (event) {
    //   console.log("WebSocket is closed now.");
    //   const onOffCheck = {
    //     onCheck: session.user.name,
    //   };

    //   socket.send(JSON.stringify(onOffCheck));
    // };

    // [onerror] 소켓 통신 중, 발생하는 에러를 처리하는 이벤트 핸들러
    socket.onerror = (error) => {
      console.error("소켓 에러: ", error);
    };
  }, []);

  // [socket] 메시지 보내기
  // 메시지를 전송하고 입력창을 초기화하는 함수
  const sendMessage = (e) => {
    e.preventDefault();
    if (socket) {
      // 메시지에 내용이 포함되어 있다면
      if (message.length > 0) {
        // setChat([...chat, { message }]); // 채팅에 메시지 추가
        setMessage(""); // 입력창 초기화

        axios
          .post("/readit/socket/chat", {
            roomNm: data._id,
            userId: session.user.email,
            userChat: message,
            userNick: session.user.name,
          })
          .then((response) => {
            console.log("[message 저장]서버 응답:", response.data);
          })
          .catch((error) => {
            console.error("에러 발생!!!:", error);
            // 에러 처리 로직을 추가합니다.
          });

        // 메시지 전송 (SockJS 사용 시)
        const socketJson = {
          userNick: session.user.name,
          userChat: message,
        };
        socket.send(JSON.stringify(socketJson));
        setInputMessage();
      }
    }
  };

  // 강퇴
  async function kick(item) {
    const confirmed = window.confirm(`"${item}"님을(를) 강퇴하시겠습니까?`);
    console.log(`Kick button clicked for ${item}`);
    // leave 버튼 클릭 시 수행할 작업
    if (confirmed) {
      console.log(`"${item}"을(를) 강퇴합니다.`);
      // 강퇴 수행할 작업
      const socketJson = {
        kickNick: item,
      };
      socket.send(JSON.stringify(socketJson));

      // 서버를 통해 삭제할 값을 넘김
      await fetch("/api/post/userLeave", {
        method: "POST",
        body: JSON.stringify({ _id: data._id, userName: item }),
      });
      // html에 변화가 생길 시, 새로고침
      router.refresh();
    }
  }

  // 위임
  async function leader(item) {
    const confirmed = window.confirm(
      `"${item}"님을(를) 방장으로 위임하시겠습니까?`
    );
    console.log(`Leader button clicked for ${item}`);
    // Leader 버튼 클릭 시 수행할 작업
    if (confirmed) {
      console.log(`"${item}"을(를) 위임합니다.`);
      // 위임 수행할 작업
      const socketJson = {
        leaderNick: item,
      };
      socket.send(JSON.stringify(socketJson));

      // 서버를 통해 위임할 값을 넘김
      await fetch("/api/post/userLeader", {
        method: "POST",
        body: JSON.stringify({ _id: data._id, userName: item }),
      });
      // setUserHost(item);

      // 새로고침
      // router.refresh();
    }
  }

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

  // [방나가기. 방식1] 방 나가기 버튼 생성 및 기능 구현(방 나가기 버튼 클릭시, 참여목록에서 제외됩니다.)
  // 1. 방을 나간 순간, DB 에서 해당 닉네임을 갖는 정보를 삭제
  // 2. data 에 변화가 생기면 방에 있는 다른 사람에게 알리거나, 목록화면 다시 랜더링
  async function exitRoom() {
    const confirmed = window.confirm(
      session.user.name + "님, 정말로 방을 나가시겠습니까?"
    );
    if (confirmed) {
      // 만약 나간 사람이 방장이라면...
      if (session.user.name === userHost) {
        const socketJson = {
          leaderNick: data.participants[1],
        };
        socket.send(JSON.stringify(socketJson));

        // 서버를 통해 위임할 값을 넘김
        await fetch("/api/post/userLeader", {
          method: "POST",
          body: JSON.stringify({
            _id: data._id,
            userName: data.participants[1],
          }),
        });

        // 페이지를 벗어날 때, 서버 소켓에 사용자의 상태를 서버에 알립니다.
        const leaveCheck = {
          leaveUser: session.user.name,
        };
        socket.send(JSON.stringify(leaveCheck));

        // 내용 전송 후, 소켓 연결 종료
        socket.close();

        await fetch("/api/post/userLeave", {
          // API 엔드포인트를 호출하여 사용자가 나간 정보를 백엔드에 알립니다.
          method: "POST",
          body: JSON.stringify({ _id: data._id, userName: session.user.name }),
          // headers: { "Content-Type": "application/json" },
        });

        // 홈으로 이동하기
        router.push("/");
      } else {
        // 페이지를 벗어날 때, 서버 소켓에 사용자의 상태를 서버에 알립니다.
        const leaveCheck = {
          leaveUser: session.user.name,
        };
        socket.send(JSON.stringify(leaveCheck));

        // 내용 전송 후, 소켓 연결 종료
        socket.close();

        await fetch("/api/post/userLeave", {
          // API 엔드포인트를 호출하여 사용자가 나간 정보를 백엔드에 알립니다.
          method: "POST",
          body: JSON.stringify({ _id: data._id, userName: session.user.name }),
          // headers: { "Content-Type": "application/json" },
        });

        // 홈으로 이동하기
        router.push("/");
      }
    }
  }

  // [방나가기. 방식2] 뒤로가기나 다른 곳을 누르지 않고 직접 나가기(참여목록에서 제외 X)
  // function exitRoom() {
  //   const confirmed = window.confirm("정말로 방을 나가시겠습니까?");
  //   if (confirmed) {
  //     router.push("/");
  //   }
  // }

  // 창 높이
  const height = window.innerHeight;

  return (
    <div style={{ height: height }} className="readingRoom">
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
          {loadChat.map((my, index) => {
            return (
              <li
                key={index}
                className={
                  userHost !== session.user.name
                    ? "chatMessage"
                    : "chatMessage2"
                }
              >
                {userHost !== session.user.name ? (
                  <>
                    <div className="nickBubble">{my.userNick}</div>
                    <div className="messageBubble">{my.userChat}</div>
                  </>
                ) : (
                  <>
                    <div className="messageBubble">{my.userChat}</div>
                    <div className="nickBubble">{my.userNick}</div>
                  </>
                )}
              </li>
            );
          })}
          {chat.map((msg, index) => (
            <li
              key={index}
              className={
                userHost !== msg.userNick ? "chatMessage" : "chatMessage2"
              }
            >
              {userHost !== msg.userNick ? (
                <>
                  <div className="nickBubble">{msg.userNick}</div>
                  <div className="messageBubble">{msg.userChat}</div>
                </>
              ) : (
                <>
                  <div className="messageBubble">{msg.userChat}</div>
                  <div className="nickBubble">{msg.userNick}</div>
                </>
              )}
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
              {showInfo ? "참여자 목록 보기" : "도서 정보 보기"}
            </button>
          </div>
          <div className="room-header">
            {showInfo ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h2>도서 정보</h2>
                {/* 방장만이 방의 수정 및 삭제 권한을 가진다. */}
                {data.participants[0] == session.user.name ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
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
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h2>참여자 목록&nbsp;({maxIndex + 1}명) </h2>
                <h4 onClick={exitRoom} className="toggleButton2">
                  방 나가기
                </h4>
              </div>
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
              {data.participants.map((item, index) => {
                // 온, 오프라인 확인
                // data.participants: 방에 이미 들어왔었던 사람목록
                // enterUser: 방금 방에 들어온 사람목록
                const isOnline = enterUserList.includes(item);
                // console.log("모든 참가자: " + item);
                // console.log("들어온 참가자: " + userListCheck);
                console.log("data-item: " + item);
                console.log("온, 오프라인 여부: " + isOnline);
                console.log(
                  "방에 이미 들어왔었던 사람목록: " + data.participants
                );
                console.log("방금 방에 들어온 사람목록: " + enterUserList);
                return index === 0 ? (
                  <div
                    key={index}
                    className="participant"
                    style={{ width: "fit-content" }}
                  >
                    {isOnline ? (
                      <div>
                        {item}&nbsp;
                        <span className="room-Leader">방장 </span>
                        <span className="online"> ON</span>
                      </div>
                    ) : (
                      <div>
                        {item}&nbsp;
                        <span className="room-Leader">방장 </span>
                        <span className="offline"> OFF</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    key={index}
                    className="participant"
                    style={{ width: "fit-content" }}
                  >
                    {isOnline ? (
                      <div>
                        <span>{item}</span>
                        <span className="online">ON</span>
                      </div>
                    ) : (
                      <div>
                        <span>{item}</span>
                        <span className="offline">OFF</span>
                      </div>
                    )}
                    {userHost === session.user.name ? (
                      <div>
                        <span
                          className="Leader-name"
                          onClick={() => leader(item)}
                        >
                          위임하기
                        </span>
                        <span className="kick-name" onClick={() => kick(item)}>
                          강퇴하기
                        </span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
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
