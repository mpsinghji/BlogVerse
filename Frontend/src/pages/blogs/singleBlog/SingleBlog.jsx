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
    <div className="min-h-screen bg-white py-12 pt-25">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
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
                <div className="relative bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30 p-6 lg:p-8">
                  <SingleBlogCard blogs={blog.post} />
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-slate-800/40 backdrop-blur-lg rounded-2xl border border-slate-700/30 p-6 lg:p-8">
                <CommentCard comments={blog?.comments} />
              </div>
            </div>

            {/* Related Articles Sidebar */}
            <div className="lg:w-1/3 w-full">
              <div>
                <RelatedBlogs />
              </div>
            </div>
          </div>
        )}

        {/* Ambient Effects */}
        {/* <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div> */}
        {/* <div className="fixed bottom-20 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div> */}
      </div>
    </div>
  )
}

export default SingleBlog