"use client";
import React, { useState, useEffect, useRef } from "react";

export default function HomeCategory({ data }) {
  const coverImageRefs = useRef(data.map(() => React.createRef()));
  const [hoverIndex, setHoverIndex] = useState(-1);

  //   useEffect(() => {
  //     function handleMouseEnter(index) {
  //       setHoverIndex(index);
  //     }

  //     function handleMouseLeave() {
  //       setHoverIndex(-1);
  //     }

  //     coverImageRefs.current.forEach((ref, index) => {
  //       if (ref.current) {
  //         ref.current.addEventListener("mouseenter", () =>
  //           handleMouseEnter(index)
  //         );
  //         ref.current.addEventListener("mouseleave", handleMouseLeave);
  //       }
  //     });

  //     return () => {
  //       coverImageRefs.current.forEach((ref, index) => {
  //         if (ref.current) {
  //           ref.current.addEventListener("mouseenter", () =>
  //             handleMouseEnter(index)
  //           );
  //           ref.current.removeEventListener("mouseleave", handleMouseLeave);
  //         }
  //       });
  //     };
  //   }, []);

  // ...

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
                    {item.title}
                    <br></br>- {item.author} -<p></p>
                    <img
                      className="coverImage2"
                      src={item.backImageUrl}
                      alt=""
                    ></img>
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
