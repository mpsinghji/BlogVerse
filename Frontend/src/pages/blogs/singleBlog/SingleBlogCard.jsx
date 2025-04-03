import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../../utils/formatDate";
import EditorJSHTML from "editorjs-html";
import { BACKEND_URL } from "../../../config/config";

const editorJSHTML = EditorJSHTML();

const SingleBlogCard = ({ blogs }) => {
  const {
    title,
    description,
    content,
    coverImg,
    category,
    rating,
    author,
    createdAt,
  } = blogs || {};
  const htmlContent = editorJSHTML.parse(content);
  const [authorUsername, setAuthorUsername] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (!author) return;
        const response = await axios.get(
          `${BACKEND_URL}/api/auth/get/${author}`
        );
        setAuthorUsername(response.data.user?.username || "Unknown Author");
      } catch (error) {
        console.error("Error fetching author:", error);
        setAuthorUsername("Error loading author");
      }
    };

    fetchUsername();
  }, [author]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="group relative">
        <div className="relative space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-white pb-2 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="flex items-center space-x-4 text-white">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"></span>
              <span className="bg-gradient-to-r from-purple-500/20 to-cyan-400/20 px-3 py-1 rounded-full border border-purple-500/30">
                {formatDate(createdAt)}
              </span>
            </span>
            <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full"></span>
            <span className="bg-gradient-to-r from-purple-500/20 to-cyan-400/20 px-3 py-1 rounded-full border border-purple-500/30">
              by {authorUsername}
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="group relative rounded-2xl overflow-hidden border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        <img
          src={coverImg}
          alt="cover Image"
          className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-8 text-white">
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="space-y-6 futuristic-editor-content"
        />

        {/* Rating Section */}
        <div className="flex items-center space-x-4 p-6 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-700/30">
          <div className="flex space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="bg-white bg-clip-text text-transparent font-bold">
            {rating}/5 (Based on 2370 reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
