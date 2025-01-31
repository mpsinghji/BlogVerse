import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/BlogsApi';
import SingleBlogCard from './SingleBlogCard';

const SingleBlog = () => {
  const { id } = useParams();
  const {data: blog, error, isLoading} = useFetchBlogByIdQuery(id);

  return (
    <div className='text-primary container mx-auto mt-8'>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <div>Something Went Wrong</div>}
        {
          blog?.post && (
            <div className='flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8'>
              <div className='lg:w-2/3 w-full'>
                {/* <h1>{blog.post.title}</h1> */}
                <SingleBlogCard blogs={blog.post}/>
                <div>Comments</div>
              </div>
              <div className='bg-white lg:w-1/3 w-full'> Related Blogs</div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SingleBlog