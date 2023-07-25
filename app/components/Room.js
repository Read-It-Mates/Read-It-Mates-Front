"use client";

import Link from "next/link";

export default function Room() {
  return (
    // 리딩룸 게시판
    <div className="mates-container">
      <div className="mates-board-container">
        <div className="mates-board">
          <div className="mates-board-num">
            <div className="mates-board-column">번호</div>
            <h4>1</h4>
            <h4>2</h4>
            <h4>3</h4>
            <h4>4</h4>
            <h4>5</h4>
            <h4>6</h4>
            <h4>7</h4>
            <h4>8</h4>
            <h4>9</h4>
            <h4>10</h4>
          </div>
          <div className="mates-board-name">
            <div className="mates-board-column">방 제목</div>
            <h4>책 같이 읽으실분~</h4>
            <h4>책 소개 및 후기</h4>
            <h4>혼자 읽기 아쉬운 책</h4>
            <h4>이런 책 어때요?</h4>
            <h4>지금 읽고 있는 책</h4>
            <h4>웃음이 절로 나오는 책들</h4>
            <h4>감동의 순간들</h4>
            <h4>인생 책 찾기</h4>
            <h4>책에 관한 질문방</h4>
            <h4>자유롭게 이야기하기</h4>
          </div>
          <div className="mates-board-title">
            <div className="mates-board-column">책 제목</div>
            <h4>탐욕의 원죄</h4>
            <h4>어떻게 멘토를 찾고 신뢰할 수 있나요</h4>
            <h4>시간의 실과 공간의 바늘</h4>
            <h4>밤의 신화</h4>
            <h4>나는 오늘도 인간을 먹었다</h4>
            <h4>인간 본능</h4>
            <h4>전쟁의 길고 어두운 무늬</h4>
            <h4>경제학산책</h4>
            <h4>속삭이는 사람</h4>
            <h4>나의 멋진 사촌</h4>
          </div>
          <div className="mates-board-genre">
            <div className="mates-board-column">장르</div>
            <h4>추리 미스터리</h4>
            <h4>로맨스</h4>
            <h4>판타지</h4>
            <h4>판타지</h4>
            <h4>시조</h4>
            <h4>과학 서적</h4>
            <h4>역사와 문화</h4>
            <h4>경제 경영</h4>
            <h4>에세이</h4>
            <h4>기타 장르</h4>
          </div>
          <div className="mates-board-number">
            <div className="mates-board-column">인원</div>
            <h4>11/32</h4>
            <h4>23/46</h4>
            <h4>7/33</h4>
            <h4>2/3</h4>
            <h4>8/96</h4>
            <h4>31/32</h4>
            <h4>8/8</h4>
            <h4>7/21</h4>
            <h4>16/18</h4>
            <h4>14/20</h4>
          </div>
          <div className="mates-board-btn">
            <div className="mates-board-column2">참여하기</div>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
            <h4>참여하기</h4>
          </div>
        </div>
        <div className="mates-board-bottom">
          <div className="search-container2">
            <input className="search-input2" type="text" placeholder="검색" />
            <div className="search-options-container">
              <select className="search-options" name="search-option">
                <option value="board" selected>
                  방 제목
                </option>
                <option value="title">책 제목</option>
                <option value="title">장르</option>
              </select>
            </div>
          </div>
          <div className="mates-board-page">
            <span>left</span>
            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>right</span>
          </div>
          <div className="search-container">
            <input className="search-input2" type="text" placeholder="검색" />
            <div className="search-options-container">
              <select className="search-options" name="search-option">
                <option value="board" selected>
                  방 제목
                </option>
                <option value="title">책 제목</option>
                <option value="title">장르</option>
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
