import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ onSearch, placeholder, size }) => {
  const [searchTerm, SetSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`flex justify-between border-primary/300 border-2 rounded-full px-4 py-1 items-center ${size}`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => SetSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="text-gray/600 text-body-14"
        />
        <IoSearch className="text-primary/500 w-5 h-5" />
      </div>
    </form>
  );
};

export default SearchBar;
