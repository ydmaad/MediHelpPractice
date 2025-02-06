import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import { signOutUserAPI } from "../api/auth";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("현재 인증 상태:", isAuthenticated);
  console.log("현재 사용자 정보:", user);

  const handleLogout = async () => {
    try {
      const { error } = await signOutUserAPI();
      if (error) {
        console.log("로그아웃 실패:", error);
        return;
      }
      dispatch(logout());
      navigate("/auth/login");
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };
  return (
    <div>
      <h1>홈페이지</h1>
      {isAuthenticated && <button onClick={handleLogout}>로그아웃</button>}
    </div>
  );
};

export default Home;
