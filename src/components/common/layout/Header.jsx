import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import MEDIHELP from "../../../assets/MEDIHELP.svg";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="bg-white drop-shadow-md sticky top-0 z-10">
      <div className="flex justify-between items-center h-16">
        {/* 로고 */}
        <div className="ml-10">
          <Link to="/">
            <img src={MEDIHELP} alt="logo" />
          </Link>
        </div>

        {/* 네비게이션 */}
        <div>
          <Nav />
        </div>

        {/* 우측 메뉴 */}
        <div className="flex justify-between mr-10 items-center gap-3">
          <div>
            <FaBell />
          </div>
          <div>{user?.email || null}</div>
          <div>
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
      </div>
    </header>
  );
};

export default Header;
