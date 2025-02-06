import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

// Firebase Authentication API 와 통신하는 함수들

// 이메일/비밀번호 회원가입 API
export const signUpEmailAPI = async (email, password) => {
  try {
    console.log("회원가입 시도::", { email });
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("회원가입 성공:::", user);
    return { user, error: null };
  } catch (error) {
    console.log("회원가입 실패:::", error.code, error.message);
    return { user: null, error: error.message };
  }
};

// 이메일/비밀번호 로그인 API
export const signInEmailAPI = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// 구글 로그인 Provider 인스턴스 생성
// GoogleAuthProvider : 구글 로그인을 위한 인증 제공자 클래스
// 이 provider는 구글 로그인에 필요한 설정을 담고 있음
const googleProvider = new GoogleAuthProvider();

// Google 로그인 API
export const googleLoginAPI = async () => {
  try {
    // signInWithPopup : 팝업 창을 통한 로그인을 처리하는 Firebase 함수
    const result = await signInWithPopup(auth, googleProvider);
    console.log("구글 로그인 성공 : ", result.user);
    return { user: result.user, error: null };
  } catch (error) {
    console.log("구글 로그인 실패 : ", error);
    return { user: null, error: error.message };
  }
};

// 로그아웃 API
export const signOutUserAPI = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// 현재 로그인한 사용자 가져오기
export const getCurrentUserAPI = () => {
  return auth.currentUser;
};
