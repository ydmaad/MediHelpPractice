import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Community from "./pages/Community";
import MyPage from "./pages/MyPage";
import News from "./pages/News";
import Auth from "./pages/Auth";
import CommunityDetail from "./components/community/CommunityDetail";
import { onAuthStateChanged } from "firebase/auth";
import { loginSuccess, logout } from "./redux/actions/authActions";
import { auth } from "./firebase/firebase";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Layout from "./components/common/layout/Layout";
import DrugSearch from "./pages/DrugSearch";
import CommunityWrite from "./components/community/CommunityWrite";
import CommunityEdit from "./components/community/CommunityEdit";

const App = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("로그인 상태:", user.email);
        store.dispatch(loginSuccess(user));
      } else {
        console.log("로그아웃 상태");
        store.dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/write" element={<CommunityWrite />} />
            <Route path="/community/:postId" element={<CommunityDetail />} />
            <Route path="/community/edit/:postId" element={<CommunityEdit />} />
            <Route path="/auth" element={<Auth />}>
              <Route index element={<Navigate to="/auth/login" replace />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="signup" element={<SignUpForm />} />
            </Route>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/drug-search" element={<DrugSearch />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
