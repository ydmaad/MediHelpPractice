import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// 이메일/비밀번호 회원가입
export const signUpEmail = async (email, password) => {
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

// 이메일/비밀번호 로그인
export const signInEmail = async (email, password) => {
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

// 로그아웃
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// 현재 로그인한 사용자 가져오기
export const getCurrentUser = () => {
  return auth.currentUser;
};
