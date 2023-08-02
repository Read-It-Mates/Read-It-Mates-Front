"use client";
import Link from "next/link";
import { RiLoginBoxLine } from "react-icons/ri";
import { signIn, signOut } from "next-auth/react";

export default function Session({ session }) {
  return (
    <div>
      {session != null ? (
        <span
          className="logout-btn"
          onClick={() => {
            signOut();
          }}
        >
          <RiLoginBoxLine />
          log-Out&nbsp;&nbsp;&nbsp;
        </span>
      ) : (
        <div>
          <span
            className="logout-btn"
            onClick={() => {
              signIn();
            }}
          >
            <RiLoginBoxLine />
            log-In&nbsp;&nbsp;&nbsp;
          </span>
          <Link href="/sign" className="r-link">
            <RiLoginBoxLine />
            sign-In
          </Link>
        </div>
      )}
    </div>
  );
}
