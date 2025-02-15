import React from "react";

const SkyblueButton = ({ children, size }) => {
  return (
    <button
      className={`bg-primary/50 text-primary/500 text-body-16 flex items-center justify-center rounded-md ${size}`}
    >
      {children}
    </button>
  );
};

export default SkyblueButton;
