"use client";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Session({ session }) {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/sign");
  };
  return (
    <div>
      {session != null ? (
        <button
          className="user-name"
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      ) : (
        <div>
          <button className="user-name" onClick={handleButtonClick}>
            회원가입
          </button>
          <button
            className="user-name"
            onClick={() => {
              signIn();
            }}
          >
            로그인
          </button>
        </div>
      )}
    </div>
  );
}
