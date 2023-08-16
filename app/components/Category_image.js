"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Category_image({
  data,
  num,
  column,
  country,
  category,
  hover,
}) {
  const router = useRouter();

  // 이미지 클릭 상태
  const [isMoving, setIsMoving] = useState(false);

  // 이미지 클릭 함수
  const handleImg = (item) => {
    setIsMoving(item);
  };

  // 이미지 클릭시 실행 함수
  useEffect(() => {
    if (isMoving) {
      router.push(
        `/searchPage?title=${isMoving.title}&author=${isMoving.author}&category=${isMoving.category}&image=${isMoving.image}&intro=${isMoving.intro}`
      );
      setIsMoving(false);
    }
  }, [isMoving]);

  // 이미지 useRef
  const coverImageRefs = useRef(data.map(() => React.createRef()));
  // 이미지 hover 인덱스 체크
  const [hoverIndex, setHoverIndex] = useState(-1);
  // 일본도서 카테고리 체크

  return (
    <div className={`category-container${category}`}>
      <div className="category-country">{country}</div>
      <div className={"row-container" + column}>
        {data.map((item, index) => {
          if (index < num) {
            if (country === "일본도서") {
              item.category = "일본도서";
            } else if (!item.category) {
              item.category = "미정";
            }
            return (
              <div
                className="image-container"
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
                onClick={() => handleImg(item)}
              >
                <img
                  ref={coverImageRefs.current[index]}
                  className="coverImage"
                  src={item.image}
                  alt=""
                ></img>
                {index === hoverIndex && (
                  <div
                    className={
                      hover !== false ? "hover-container" : "hover-container2"
                    }
                  >
                    <div className="hover-index">
                      <div className="hover-jenre">
                        <div className="hover-jenre">{item.category} 』</div>
                      </div>
                      {item.index + "위"}
                    </div>
                    <div className="hover-title">{"<" + item.title + ">"}</div>

                    <div className="hover-intro">
                      {item.intro ? item.intro : null}
                    </div>

                    <div className="hover-author">
                      {item.author ? item.author : null}
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
