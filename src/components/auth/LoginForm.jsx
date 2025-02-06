import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { loginFailure, loginSuccess } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { signInEmail } from "../../api/auth";

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
      const { user, error: loginError } = await signInEmail(
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
    <div>
      <h2>로그인</h2>
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
        {error && <div className="error-message">{error}</div>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
