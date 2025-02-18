import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="w-[386px] mx-auto">
      <Outlet />
    </div>
  );
};

export default Auth;
