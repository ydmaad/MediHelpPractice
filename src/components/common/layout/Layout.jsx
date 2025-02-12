import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="w-[78%] max-w[1000px] mx-auto ">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
