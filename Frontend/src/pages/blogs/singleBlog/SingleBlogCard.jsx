import React from "react";
import { formatDate } from "../../../utils/formatDate";
import EditorJSHTML from "editorjs-html";

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

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="group relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span>{formatDate(createdAt)}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="bg-gradient-to-r from-purple-500/20 to-cyan-400/20 px-3 py-1 rounded-full border border-purple-500/30">
              by {author?.username}
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
      <div className="space-y-8 text-slate-300/80">
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
          <span className="bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent font-bold">
            {rating}/5 (Based on 2370 reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

// Add this CSS for editor content styling
const styles = `
.futuristic-editor-content h2 {
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5rem 0;
  background: linear-gradient(45deg, #9333ea, #22d3ee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.futuristic-editor-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 1rem 0;
  color: #cbd5e1;
}

.futuristic-editor-content blockquote {
  border-left: 4px solid #9333ea;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: #a78bfa;
  font-style: italic;
}

.futuristic-editor-content code {
  font-family: monospace;
  background: #1e293b;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  border: 1px solid #475569;
}

.futuristic-editor-content ul {
  list-style: none;
  padding-left: 1.5rem;
}

.futuristic-editor-content ul li::before {
  content: "•";
  color: #9333ea;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
`;

export default SingleBlogCard;