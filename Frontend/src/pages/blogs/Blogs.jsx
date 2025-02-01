import React, { useState } from "react";
import Search from "./Search";
import { useFetchBlogsQuery } from "../../redux/features/blogs/BlogsApi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [searchParams, setSearchParams] = useState({
    search: "",
    category: "",
  });

  const {
    data: blogs = [],
    error,
    isLoading,
  } = useFetchBlogsQuery(searchParams);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ search, category });
  };

  return (
    <div className="mt-16 container mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto mb-20">
        <Search
          search={search}
          handleSearch={handleSearch}
          handleSearchChange={handleSearchChange}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 backdrop-blur-sm border border-red-700/50 rounded-xl p-6 text-red-300 text-center animate-pulse">
          ⚠️ Error: {error.toString()}
        </div>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            key={blog._id}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/20"
          >
            <div className="relative overflow-hidden h-80">
              <img
                src={blog.coverImg}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                {blog.title}
              </h2>
              <div className="flex items-center space-x-2 text-slate-400"></div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>

      {blogs.length === 0 && !isLoading && !error && (
        <div className="text-center py-20 text-slate-400 text-xl">
          No articles found matching your search
        </div>
      )}
    </div>
  );
};

export default Blogs;
