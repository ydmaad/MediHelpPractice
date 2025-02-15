import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  size,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`rounded-md bg-primary/500 px-6 py-2 text-header-16 text-white hover:bg-primary/600 transition-colors ${size}`}
    >
      {children}
    </button>
  );
};

export default Button;
