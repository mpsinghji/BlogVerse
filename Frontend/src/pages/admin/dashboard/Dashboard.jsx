import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/BlogsApi";
import { FaSpinner } from "react-icons/fa";
import { useGetCommentsQuery } from "../../../redux/features/comments/commentApi";
import { useGetUserQuery } from "../../../redux/features/auth/authApi";
import BlogChart from "./BlogChart";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState({ search: "", category: "" });
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery();
  const { data: users = {} } = useGetUserQuery();
  const { data: comments = [] } = useGetCommentsQuery();
  const adminCount = users.users?.filter(
    (user) => user.role === "admin"
  ).length;

  return (
    <div className="min-h-screen bg-white p-6">
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <FaSpinner className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-white to-purple-50 backdrop-blur-md rounded-2xl border border-gray-200 shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hi, {user?.username}!
          </h1>
          <p className="text-gray-500 mt-2">Welcome to the Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative bg-gradient-to-br from-purple-100 to-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center space-x-4">
              <FiUsers className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-gray-600">Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.users?.length}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-purple-100 to-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center space-x-4">
              <FaBlog className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-gray-600">Blogs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {blogs.length}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-purple-100 to-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center space-x-4">
              <RiAdminLine className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-gray-600">Admin</p>
                <p className="text-2xl font-bold text-gray-900">{adminCount}</p>
              </div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-purple-100 to-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex items-center space-x-4">
              <FaRegComment className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-gray-600">Comments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {comments?.totalComments}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 pb-5">
        <BlogChart blogs={blogs} />
      </div>
    </div>
  );
};

export default Dashboard;
