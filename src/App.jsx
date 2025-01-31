import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Community from "./pages/Community";
import MyPage from "./pages/MyPage";
import News from "./pages/News";
import Auth from "./pages/Auth";
import CommunityDetail from "./components/community/CommunityDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/community" element={<Community />}>
          <Route path=":postId" element={<CommunityDetail />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
