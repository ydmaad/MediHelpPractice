import React from "react";

const SkyblueButton = ({ children, size, onClick }) => {
  return (
    <button
      className={`bg-primary/50 text-primary/500 text-body-16 flex items-center justify-center rounded-md ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SkyblueButton;
