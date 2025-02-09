import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-between gap-5">
      <Link to="/drug-search">약 검색</Link>
      <Link to="/news">뉴스</Link>
      <Link to="community">커뮤니티</Link>
      <Link to="calendar">복약 달력</Link>
    </nav>
  );
};

export default Nav;
