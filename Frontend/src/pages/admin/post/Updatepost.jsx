import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useFetchBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/features/blogs/BlogsApi";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../../utils/toast";

const Updatepost = () => {
  const { id } = useParams();

  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const [updateBlog] = useUpdateBlogMutation();

  const { user } = useSelector((state) => state.auth);

  const {
    data: blog = {},
    error,
    isLoading,
    refetch,
  } = useFetchBlogByIdQuery(id);
  console.log(blog);

  useEffect(() => {
    if (blog.post) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: Header,
          list: List,
        },
        data: blog.post.content,
        onReady: () => {
          editorRef.current = editor;
        },
      });

      return () => {
        editor.destroy();
        editorRef.current = null;
      };
    }
  }, [blog.post]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const updatedPost = {
        title: title || blog.post.title,
        coverImg: coverImg || blog.post.coverImg,
        content,
        category: category || blog.post.category,
        description: metaDescription || blog.post.description,
        author: user?._id,
        rating: rating || blog.post.rating,
      };

      // console.log(updatedPost);
      const response = await updateBlog({ id, ...updatedPost }).unwrap();
      console.log("Post updated successfully:", response);
      showToast.success("Post updated successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      refetch();
    } catch (error) {
      showToast.error("Error updating post. Please try again!");
    }
  };
  return (
    <>
      <div className="bg-white md:p-8 p-4 rounded-2xl shadow-xl border border-purple-50">
        <h2 className="text-3xl font-bold mb-6 text-purple-800">
          Edit or Update Post
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Blog Title */}
          <div className="space-y-2">
            <label className="font-semibold text-lg text-purple-700">
              Blog Title
            </label>
            <input
              type="text"
              defaultValue={blog?.post?.title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border-2 border-purple-100 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Left Side Content Section */}
            <div className="md:w-2/3 w-full">
              <div className="mb-4">
                <p className="font-semibold text-xl text-purple-800 mb-1">
                  Content Editor
                </p>
                <p className="text-sm text-purple-400">
                  Craft your amazing content below
                </p>
              </div>
              <div
                id="editorjs"
                className="border-2 border-purple-100 p-4 rounded-xl bg-purple-50 min-h-[400px] hover:border-purple-200 transition-colors"
              ></div>
            </div>

            {/* Right Side Blog Details */}
            <div className="md:w-1/3 w-full p-6 bg-white border-2 border-purple-100 rounded-xl shadow-sm space-y-6">
              {/* Cover Image */}
              <div className="space-y-2">
                <label className="font-semibold text-purple-700">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  defaultValue={blog?.post?.coverImg}
                  onChange={(e) => setCoverImg(e.target.value)}
                  className="w-full bg-white border-2 border-purple-100 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder="Paste image URL here"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="font-semibold text-purple-700">
                  Category
                </label>
                <input
                  type="text"
                  defaultValue={blog?.post?.category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border-2 border-purple-100 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder="e.g., Technology, Travel"
                  required
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <label className="font-semibold text-purple-700">
                  Meta Description
                </label>
                <textarea
                  rows={4}
                  defaultValue={blog?.post?.description}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full bg-white border-2 border-purple-100 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  placeholder="Brief summary of your post"
                  required
                ></textarea>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="font-semibold text-purple-700">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={blog.post?.rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-white border-2 border-purple-100 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                  required
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <label className="font-semibold text-purple-700">Author</label>
                <input
                  type="text"
                  value={user.username}
                  className="w-full bg-purple-50 border-2 border-purple-100 px-4 py-2 rounded-lg text-purple-700 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold px-6 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-purple-200"
          >
            Update Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Updatepost;
