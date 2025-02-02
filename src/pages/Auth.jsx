import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin ? <LoginForm /> : <SignUpForm />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "회원가입하기" : "로그인하기"}
      </button>
    </div>
  );
};

export default Auth;
