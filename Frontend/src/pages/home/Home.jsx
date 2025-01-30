import React from 'react'
import Hero from './Hero.jsx'
import Blogs from '../blogs/Blogs.jsx'

const home = () => {
  return (
    <div className='bg-white text-primary container mx-auto mt-8 p-8'>
      <Hero/>
      <Blogs/>
    </div>
  )
}

export default home