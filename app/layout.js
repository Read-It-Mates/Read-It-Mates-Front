import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/">
            <img src="/logo3.png" className="logo"></img>
          </Link>
          <Link href="/list">베스트셀러</Link>
          <Link href="/list">스테디셀러</Link>
          <Link href="/list">리딧베스트</Link>
          <Link href="/list">리딩룸</Link>
          <Link href="/list">로그인</Link>
          <Link href="/list">회원가입</Link>
        </div>
        {children}
        <div className="footer">© 2023 Read-It Mates.</div>
      </body>
    </html>
  );
}
