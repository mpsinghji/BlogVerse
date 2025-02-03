import React from "react";
import DefaultUserIcon from "../../../assets/defaultUserIcon.png";
import { formatDate } from "../../../utils/formatDate";
import PostAComment from "./PostAComment";
import { FaRegThumbsUp, FaRegThumbsDown, FaReply } from "react-icons/fa";

const CommentCard = ({ comments }) => {
  return (
    <div className="space-y-8">
      {/* Comments Section */}
      <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30 p-6 lg:p-8">
        <h3 className="text-2xl font-bold bg-white bg-clip-text text-transparent mb-8">
          Community Discussion
        </h3>

        {comments?.length > 0 ? (
          <div className="space-y-8">
            {comments.map((comment, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6">
                  {/* Comment Header */}
                  <div className="flex items-center space-x-4">
                    <img 
                      src={comment?.user?.avatar || DefaultUserIcon} 
                      alt={comment?.user?.username} 
                      className="w-12 h-12 rounded-full border-2 border-purple-500/50 object-cover"
                    />
                    <div>
                      <p className="text-lg font-medium bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                        {comment?.user?.username}
                      </p>
                      <p className="text-sm text-slate-400">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <div className="mt-4 p-4 bg-slate-800/40 rounded-lg border border-slate-700/30">
                    <p className="text-slate-300/80 leading-relaxed">
                      {comment?.comment}
                    </p>
                  </div>

                  {/* Comment Actions */}
                  <div className="mt-4 flex items-center space-x-6 text-slate-400">
                    <button className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-200">
                      <FaRegThumbsUp className="w-5 h-5" />
                      <span>{comment?.likes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-cyan-400 transition-colors duration-200">
                      <FaRegThumbsDown className="w-5 h-5" />
                      <span>{comment?.dislikes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-slate-300 transition-colors duration-200">
                      <FaReply className="w-5 h-5" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {/* Nested Replies */}
                  {comment?.replies?.length > 0 && (
                    <div className="mt-6 pl-6 border-l-2 border-slate-700/30 space-y-6">
                      {comment.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} className="group relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-cyan-500/10 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                          <div className="relative bg-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/30 p-4">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={reply?.user?.avatar || DefaultUserIcon} 
                                alt={reply?.user?.username} 
                                className="w-10 h-10 rounded-full border-2 border-purple-500/50 object-cover"
                              />
                              <div>
                                <p className="text-md font-medium bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                                  {reply?.user?.username}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {formatDate(reply.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 p-3 bg-slate-800/40 rounded-lg border border-slate-700/30">
                              <p className="text-slate-300/80 text-sm leading-relaxed">
                                {reply?.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <p className="text-xl">No comments yet</p>
            <p className="text-sm mt-2">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      {/* Post Comment Section */}
      <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30 p-6 lg:p-8">
        <PostAComment />
      </div>
    </div>
  );
};

export default CommentCard;