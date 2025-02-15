import React from "react";

const CategoryButton = ({ children, onClick, isSelected, size }) => {
  return (
    <button
      onClick={onClick}
      className={`text-body-14 rounded-full flex items-center justify-center ${
        isSelected ? "bg-gray/800 text-white " : "bg-gray/50 text-gray/600"
      } ${size}`}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
