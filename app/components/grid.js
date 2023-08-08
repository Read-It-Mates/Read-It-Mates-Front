"use client";
import React, { useState, useCallback } from "react";
function CategoryButton({ label, isSelected, onClick }) {
  return (
    <button
      className={`category-btn${isSelected ? " selected" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function Grid({ result, categories, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("종합");
  const onCategoryClick = useCallback(
    (category) => {
      setSelectedCategory(category);
      onCategoryChange(category);
    },
    [onCategoryChange]
  );
  return (
    <>
      <div className="button-grid">
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            label={category}
            isSelected={category === selectedCategory}
            onClick={() => onCategoryClick(category)}
          />
        ))}
      </div>
      <div className="container2">
        <div className="container3">
          {result.map((item, index) => {
            return (
              <div className="bookItem" key={index}>
                <h4 className="title">
                  {item.index + ". "}
                  {item.title}
                  <br></br>
                  {" - " + item.author + " - "}
                </h4>
                <img className="coverImage2" src={item.image} alt=""></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
