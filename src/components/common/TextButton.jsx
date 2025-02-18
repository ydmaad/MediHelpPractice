import React from "react";

const TextButton = ({ children, onClick }) => {
  return (
    <button className={`text-body-16 text-gray-600 `} onClick={onClick}>
      {children}
    </button>
  );
};

export default TextButton;
