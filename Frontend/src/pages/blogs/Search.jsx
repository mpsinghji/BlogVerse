import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ search, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="group relative w-full max-w-2xl mx-auto">
      {/* Floating Gradient Overlay */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      
      <div className="relative flex items-center bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300">
        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for blogs..."
          className="w-full bg-transparent py-3 px-6 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold rounded-r-xl transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2"
        >
          <FaSearch className="w-5 h-5" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default Search;