import React from "react";
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/BlogsApi";
import { Link, useParams } from "react-router-dom";

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blog = [], error, isLoading } = useFetchRelatedBlogsQuery(id);
  // console.log(blog);
  return (
    <div>
      <h3 className="text-2xl font-medium pt-8 px-8 pb-5">Related Blogs</h3>
      <hr />
      {blog.length > 0 ?  (
        <div className="space-y-4 mt-5">
            {
                blog.map((blogs)=>(
                    <Link
                    to={`/blogs/${blogs._id}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm px-8 py-4">
                    <div className="size-14">
                        <img src={blogs.coverImg} alt="" className="h-full w-full rounded-full ring-2 ring-blue-700"/>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1E73BE]">{blogs?.title.substring(0,50)}</h4>
                      <p className="">{blogs?.description.substring(0,60)}...</p>
                    </div>
                    </Link>
                ))
            }
        </div>
      ):(
        <div className="p-8">No Related blogs found!</div>
      )}
    </div>
  );
};

export default RelatedBlogs;
