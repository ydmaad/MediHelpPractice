import React from "react";

const PrimaryButton = ({ children, onClick, disabled = false, style }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md bg-primary/500 text-white hover:bg-primary/600 transition-colors ${style}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
