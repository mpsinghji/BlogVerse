import React, { useState } from "react";
import {
  useDeleteBlogMutation,
  useFetchBlogsQuery,
} from "../../../redux/features/blogs/BlogsApi";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { showToast } from "../../../utils/toast";

const ManagePost = () => {
  const [query, setQuery] = useState({ search: "", category: "" });
  const {
    data: blogs = [],
    error,
    isLoading,
    refetch,
  } = useFetchBlogsQuery(query);
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (postId) => {
    showToast.info(
      <div>
        Are you sure you want to delete this post?
        <button
          className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
          onClick={async () => {
            try {
              const response = await deleteBlog(postId).unwrap();
              showToast.success(response.message);
              refetch();
            } catch (error) {
              showToast.error("Failed to delete post.");
            }
          }}
        >
          Yes
        </button>
        <button
          className="ml-2 px-2 py-1 bg-gray-500 text-white rounded"
          onClick={() => showToast.dismiss()}
        >
          No
        </button>
      </div>
    );
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visibleBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">All Blogs</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blog Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Publishing Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Edit or Manage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visibleBlogs.map((blog, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                        {blog.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(blog.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={`/dashboard/update-items/${blog?._id}`}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                        >
                          <MdModeEdit className="w-4 h-4" />
                          <span>Edit</span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end space-x-2 mt-4 px-6 py-3 bg-gray-50">
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => handlePageChange(pageIndex + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === pageIndex + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {pageIndex + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManagePost;
