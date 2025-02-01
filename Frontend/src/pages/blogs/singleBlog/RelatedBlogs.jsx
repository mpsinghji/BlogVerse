import React from "react";
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/BlogsApi";
import { Link, useParams } from "react-router-dom";

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blog = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

  return (
    <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent p-6">
        Related Articles
      </h3>
      
      <div className="border-t border-slate-700/30"></div>

      {isLoading ? (
        <div className="p-6 flex justify-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-cyan-400 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-6 text-red-300/80 text-center animate-pulse">
          ⚠️ Error loading related content
        </div>
      ) : blog.length > 0 ? (
        <div className="grid gap-4 p-4">
          {blog.map((blogs) => (
            <Link
              to={`/blogs/${blogs._id}`}
              key={blogs._id}
              className="group relative overflow-hidden bg-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 p-4"
            >
              <div className="flex gap-4 items-start">
                <div className="relative min-w-[80px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img 
                    src={blogs.coverImg} 
                    alt={blogs.title}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-slate-700/50 group-hover:border-purple-500/50 transition-colors duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-medium bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                    {blogs.title.substring(0, 50)}
                  </h4>
                  <p className="text-sm text-slate-400/80 leading-relaxed">
                    {blogs.description.substring(0, 80)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-slate-400/80">
          No related articles found
        </div>
      )}
    </div>
  );
};

export default RelatedBlogs;