import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpEmail } from "../../firebase/auth";
import { loginFailure, loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: 입력값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO: 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { user, error: signUpError } = await signUpEmail(
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
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
        </div>
        <div>
          <label htmlFor="comfirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="********"
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpForm;
