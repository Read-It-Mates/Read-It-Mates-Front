"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Category_image({ data }) {
  const coverImageRefs = useRef(data.map(() => React.createRef()));
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <div>
      <div className="row-container">
        {data.map((item, index) => {
          if (index < 8) {
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
                  src={item.imageUrl}
                  alt=""
                ></img>
                {index === hoverIndex && (
                  <div className="hover-container" style={{ borderRadius: 20 }}>
                    <div className="hover-title">{item.title}</div>
                    <div className="hover-author" style={{ borderRadius: 20 }}>
                      {" "}
                      - {item.author} -
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
      <br></br>
      <div style={{ height: 1000 }}></div>
    </div>
  );
}
