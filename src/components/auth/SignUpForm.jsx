import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { signUpEmailAPI } from "../../api/auth";
import PrimaryButton from "../common/button/PrimaryButton";
import { IoCheckbox, IoCheckboxOutline } from "react-icons/io5";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 입력값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { user, error: signUpError } = await signUpEmailAPI(
        formData.email,
        formData.password
      );

      if (signUpError) {
        setError(signUpError);
        dispatch(loginFailure(signUpError));
        return;
      }

      if (user) {
        dispatch(loginSuccess(user));
        alert("회원가입이 완료되었습니다!");
        navigate("/auth");
      }
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다.");
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <h2 className="text-header-28 text-gray/800">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-9">
          <div className="text-body-16 text-gray/1000">닉네임</div>
          <input
            id="nickname"
            type="nickname"
            name="nickname"
            onChange={handleChange}
            placeholder="닉네임 설정"
            className="border py-2 px-4 w-full rounded-md focus:outline-none"
          />
          <div className="text-body-12 text-gray-600">
            6자 이내로 설정해주세요.
          </div>
        </div>
        <div className="mb-9">
          <label htmlFor="email" className="text-body-16 text-gray/1000">
            이메일 입력
          </label>
          <div className="flex justify-between">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@도메인.com"
              className="border py-2 px-4 w-[290px] rounded-md focus:outline-none"
            />
            <PrimaryButton size="w-[91px] h-[48px] px-2">
              중복확인
            </PrimaryButton>
          </div>
          <div className="text-body-12 text-gray-600">
            이메일 주소를 입력해주세요.
          </div>
        </div>
        <div className="mb-9">
          <label htmlFor="password" className="text-body-16 text-gray/1000">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력해 주세요."
            className="w-full border py-2 px-4 rounded-md focus:outline-none"
          />
          <div className="text-body-12 text-gray-600">
            영문자, 숫자, 특수문제 포함 6자 이상
          </div>
        </div>
        <div className="mb-9">
          <label
            htmlFor="comfirmPassword"
            className="text-body-16 text-gray/1000"
          >
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="다시 한번 입력해 주세요."
            className="w-full border py-2 px-4 rounded-md focus:outline-none"
          />
        </div>
        <button className="flex justify-start">
          <IoCheckbox className="text-gray-600 w-5 h-5" />
          <div className="text-body-16 text-gray/600">
            개인정보처리방침 약관 동의 (필수)
          </div>
        </button>

        <button className="flex justify-start">
          <IoCheckboxOutline className="text-gray-600 w-5 h-5" />
          <div className="text-body-16 text-gray/600">
            메디헬프 서비스 이용약관 동의 (필수)
          </div>
        </button>

        <PrimaryButton type="submit" size="w-full">
          회원가입
        </PrimaryButton>
      </form>
    </div>
  );
};

export default SignUpForm;
