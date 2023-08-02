"use client";
import Link from "next/link";
export default function Navbar() {
  // 이미지 배경 변경 함수
  const changeBackground = (event) => {
    // 랜덤하게 0 or 1 선택.
    const randomIndex = Math.floor(Math.random() * 2);
    const images = ["/UK.png", "/US.png"];

    // 이미지 경로 업데이트
    const selectedImage = images[randomIndex];

    // 이미지 배경 변경
    const element = event.target;
    element.style.backgroundImage = `url(${selectedImage})`;
  };

  // 이미지 배경 안보이게 하는 함수
  const removeBackground = (event) => {
    const element = event.target;
    element.style.backgroundImage = "none";
  };
  return (
    <div className="navbar-container">
      <div className="navbar-icon-container">
        <Link href="/domestic">
          <img src="/navbar1.png" className="navbar1-icon"></img>
        </Link>
        <Link href="/western">
          <img
            src="/navbar2.png"
            className="navbar2-icon"
            onMouseOver={changeBackground}
            onMouseLeave={removeBackground}
          ></img>
        </Link>
        <Link href="/japanese">
          <img src="/navbar3.png" className="navbar3-icon"></img>
        </Link>
      </div>
      <div className="navbar-title-container">
        <h4>국내도서</h4>
        <h4>서양도서</h4>
        <h4>일본도서</h4>
      </div>
    </div>
  );
}
