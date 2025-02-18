import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLoginAPI } from "../../api/auth";
import { loginFailure, loginSuccess } from "../../redux/actions/authActions";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const { user, error } = await googleLoginAPI();

      if (error) {
        dispatch(loginFailure(error));
        return;
      }

      dispatch(loginSuccess(user));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure("구글 로그인 중 오류가 발생했습니다."));
    }
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center w-full bg-white py-2 h-[45px]"
    >
      <FcGoogle className="w-5 h-5" />
      <div className="ml-6">구글 로그인</div>
    </button>
  );
};

export default GoogleLogin;
