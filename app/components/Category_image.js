"use client";
import React, { useState, useRef } from "react";

export default function Category_image({ data, num, column, country }) {
  // 이미지 useRef
  const coverImageRefs = useRef(data.map(() => React.createRef()));
  // 이미지 hover 인덱스 체크
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <div className="category-container">
      <div className="category-country">{country}</div>
      <div className={"row-container" + column}>
        {data.map((item, index) => {
          if (index < num) {
            return (
              <div
                className="image-container"
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
              >
                <img
                  ref={coverImageRefs.current[index]}
                  className="coverImage"
                  src={item.image}
                  alt=""
                ></img>
                {index === hoverIndex && (
                  <div className="hover-container">
                    <div className="hover-index">
                      <div className="hover-jenre">{item.category + " 』"}</div>
                      {item.index + "위"}
                    </div>
                    <div className="hover-title">{"<" + item.title + ">"}</div>
                    <div className="hover-intro">{item.intro}</div>
                    <div className="hover-author">{item.author}</div>
                    <div className="hover-online">
                      온라인: 3명
                      <h3 className="hover-btn">참여하기</h3>
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
