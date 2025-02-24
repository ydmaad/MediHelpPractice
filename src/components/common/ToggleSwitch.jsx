import React from "react";

const ToggleSwitch = ({ label, isOn, handleToggle }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-800 text-lg">{label}</span>
      <div
        className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${
          isOn ? "bg-primary/500" : "bg-gray-300"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-3" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
