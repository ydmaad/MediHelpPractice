import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase 설정 객체
const firebaseConfig = {
  apiKey: "AIzaSyDOoWAO-pklE_Z3m0ZtSMs7WZgbnijqLxo",
  authDomain: "medi-help-alone.firebaseapp.com",
  projectId: "medi-help-alone",
  storageBucket: "medi-help-alone.firebasestorage.app",
  messagingSenderId: "531104125831",
  appId: "1:531104125831:web:f2e44624b4ec8ec681b922",
  measurementId: "G-S4LSJX7QMG",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 필요한 Firebase 서비스를 초기화하고 내보냄
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
