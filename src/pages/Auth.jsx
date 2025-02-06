import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/auth/login";

  return (
    <div>
      <Outlet />
      <div>
        <Link to={isLoginPage ? "/auth/signup" : "/auth/login"}>
          {isLoginPage ? "회원가입하기" : "로그인하기"}
        </Link>
      </div>
    </div>
  );
};

export default Auth;
