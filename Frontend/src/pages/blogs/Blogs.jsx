import React, { useState } from "react";
import Search from "./Search";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    setQuery({ search, category });
  };
  return (
    <div className="mt-16 container mx-auto">
      <Search
        search={search}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
      />
      <div className="mt-16 container mx-auto">Blogs Card</div>
    </div>
  );
};

export default Blogs;
