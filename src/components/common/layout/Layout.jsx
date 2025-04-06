import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import background_img from "./../../../assets/background_img.svg";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-bg font-pretendard tracking-tight">
      <Header />
      <main
        className="flex-1"
        style={
          isMainPage
            ? {
                backgroundImage: `url(${background_img})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        <div className="w-[1000px] mx-auto mt-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
