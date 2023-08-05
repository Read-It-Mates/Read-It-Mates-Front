"use client";
import React, { useState, useEffect } from "react";

const SideBar = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  const scrollTo = (id) => {
    const section = id === "top" ? document.body : document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const sections = ["top", "best-sellers", "steady-sellers", "new-best"];
    const offsetY = window.scrollY;
    let selectedIndex = 0;

    sections.forEach((id, index) => {
      if (id !== "top") {
        const section = document.getElementById(id);
        const rect = section.getBoundingClientRect();
        if (offsetY >= rect.top + offsetY - 100) {
          selectedIndex = index;
        }
      }
    });

    setSelectedSection(selectedIndex);
  };

  const handleButtonClick = (index, id) => {
    setSelectedSection(index);
    scrollTo(id);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="sidebar">
      <button
        className={`sidebar-button1 ${selectedSection === 0 ? "selected" : ""}`}
        onClick={() => handleButtonClick(0, "top")}
      >
        리딩룸
      </button>
      <button
        className={`sidebar-button2 ${selectedSection === 1 ? "selected" : ""}`}
        onClick={() => handleButtonClick(1, "best-sellers")}
      >
        베스트셀러
      </button>
      <button
        className={`sidebar-button3 ${selectedSection === 2 ? "selected" : ""}`}
        onClick={() => handleButtonClick(2, "steady-sellers")}
      >
        스테디셀러
      </button>
      <button
        className={`sidebar-button4 ${selectedSection === 3 ? "selected" : ""}`}
        onClick={() => handleButtonClick(3, "new-best")}
      >
        신간베스트
      </button>
    </div>
  );
};

export default SideBar;
