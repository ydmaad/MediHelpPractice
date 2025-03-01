import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { signInEmailAPI } from "../../api/auth";
import GoogleLogin from "./GoogleLogin";
import PrimaryButton from "../common/button/PrimaryButton";
import { IoCheckboxOutline } from "react-icons/io5";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user, error: loginError } = await signInEmailAPI(
        formData.email,
        formData.password
      );

      if (loginError) {
        setError(loginError);
        dispatch(loginFailure(loginError));
        return;
      }
      dispatch(loginSuccess(user));
      alert("로그인되었습니다!");
      navigate("/");
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <h2 className="text-header-28 text-gray/800">로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일"
            className="border py-2 px-4 w-full rounded-md focus:outline-none"
          />
        </div>
        <div className="mb-3">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            className="border py-2 px-4 w-full rounded-md focus:outline-none"
          />
        </div>
        <button className="flex justify-start mb-3">
          <IoCheckboxOutline className="text-gray-600 w-5 h-5" />
          <div className="text-body-14 text-gray/800 ml-1">이메일 기억하기</div>
        </button>

        <PrimaryButton type="submit" style="w-full px-6 py-2 text-header-16">
          로그인
        </PrimaryButton>
      </form>
      <div className="flex justify-between my-3">
        <Link to={"/auth/signup"} className="text-gray/800">
          비밀번호 찾기
        </Link>
        <Link to={"/auth/signup"} className="text-gray/800">
          회원가입
        </Link>
      </div>

      <GoogleLogin />
    </div>
  );
};

export default LoginForm;
