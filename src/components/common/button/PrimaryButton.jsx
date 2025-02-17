import React from "react";

const PrimaryButton = ({ children, onClick, disabled = false, size }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md bg-primary/500 px-6 py-2 text-header-16 text-white hover:bg-primary/600 transition-colors ${size}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
