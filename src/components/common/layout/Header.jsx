import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import MEDIHELP from "../../../assets/MEDIHELP.svg";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white drop-shadow-md">
      <div className="flex justify-between items-center h-16">
        {/* 로고 */}
        <div>
          <Link to="/">
            <img src={MEDIHELP} alt="logo" />
          </Link>
        </div>

        {/* 네비게이션 */}
        <div>
          <Nav />
        </div>

        {/* 우측 메뉴 */}
        <div className="flex justify-between">
          <div>
            <FaBell />
          </div>
          <div>{user}</div>
          {isAuthenticated ? (
            <>
              <button>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/auth/login">로그인</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
