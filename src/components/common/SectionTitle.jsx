import React from "react";

const SectionTitle = ({ children, subtitle, emoji }) => {
  return (
    <div>
      <h1 className="text-gray/1000 text-header-32">
        {emoji && <span className="mr-2">{emoji}</span>}
        {children}
      </h1>
      <div className="ml-2">
        {subtitle && <p className="text-gray/600 text-header-20">{subtitle}</p>}
      </div>
    </div>
  );
};

export default SectionTitle;
