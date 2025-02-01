import React from 'react'
import { useParams } from 'react-router-dom'
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/BlogsApi'
import SingleBlogCard from './SingleBlogCard'
import CommentCard from '../comments/CommentCard'
import RelatedBlogs from './RelatedBlogs'

const SingleBlog = () => {
  const { id } = useParams()
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-12 pt-25">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/30 backdrop-blur-sm border border-red-700/50 rounded-xl p-6 text-red-300 text-center animate-pulse">
            ⚠️ Error loading article content
          </div>
        )}

        {/* Main Content */}
        {blog?.post && (
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
            {/* Main Article */}
            <div className="lg:w-2/3 w-full space-y-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30 p-6 lg:p-8">
                  <SingleBlogCard blogs={blog.post} />
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30 p-6 lg:p-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent mb-8">
                  Community Discussion
                </h2>
                <CommentCard comments={blog?.comments} />
              </div>
            </div>

            {/* Related Articles Sidebar */}
            <div className="lg:w-1/3 w-full">
              <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30 p-6 lg:p-8">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent mb-6">
                  Related Articles
                </h3>
                <RelatedBlogs />
              </div>
            </div>
          </div>
        )}

        {/* Ambient Effects */}
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="fixed bottom-20 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  )
}

export default SingleBlog