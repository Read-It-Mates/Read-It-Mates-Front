import "./globals.css";
import Search from "./components/search";
import Navbar from "./components/navbar";
import Session from "./components/session";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 상단바 */}
        <div className="navbar">
          <Search />
          <Navbar />
          <Session />
        </div>
        {children}
        <div className="footer">© 2023 Read-It Mates.</div>
      </body>
    </html>
  );
}
