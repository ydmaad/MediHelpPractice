import React from "react";

const GrayButton = ({ children, size, onClick }) => {
  return (
    <button
      className={`bg-gray/200  text-gray/600 text-header-16 flex items-center justify-center rounded-md ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GrayButton;
