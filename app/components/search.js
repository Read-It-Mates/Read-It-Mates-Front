"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function Search() {
  useEffect(() => {
    const searchInput = document.querySelector(".search-input");

    function handleFocus() {
      const audio = new Audio("/search.mp3");
      audio.play();
    }

    searchInput.addEventListener("focus", handleFocus);

    return () => {
      searchInput.removeEventListener("focus", handleFocus);
    };
  }, []);
  return (
    <div className="navbar-l">
      <Link href="/">
        <img src="/logo3.png" className="logo"></img>
      </Link>
      <input className="search-input" type="text" placeholder="도서검색" />
    </div>
  );
}
