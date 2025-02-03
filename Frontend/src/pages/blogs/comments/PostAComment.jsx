import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

const PostAComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Add comment posting functionality
    console.log("Comment:", comment);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setComment("");
    }, 2000);
  };

  return (
    <div className="group relative">
      <div>
        <h3 className="text-xl font-bold bg-white to-cyan-300 bg-clip-text text-transparent mb-6">
          Share Your Thoughts
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/30 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none text-slate-100 placeholder-slate-400 p-4"
              rows={5}
              disabled={isSubmitting}
              required
            />
            <div className="absolute inset-0 rounded-lg pointer-events-none border border-slate-500/30 group-hover:border-purple-500/50 transition-all duration-300 mix-blend-overlay" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-purple-500/20 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FaPaperPlane className="w-5 h-5" />
                <span>Post Comment</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAComment;