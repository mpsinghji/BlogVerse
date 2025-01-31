import React, { useState } from "react";
import Search from "./Search";
import { useFetchBlogsQuery } from "../../redux/features/blogs/BlogsApi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  //get data using redux
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  // console.log(blogs);

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
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.toString()}</div>}

      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {blogs.map(blog => (
          <Link
          to={`/blogs/${blog._id}`}
          key={blog._id} className="shadow-md">
            <img src={blog.coverImg} alt="" className="h-80 w-full" />
            <h2 className="text-xl p-4">{blog.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
