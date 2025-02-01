import React from 'react'
import Hero from './Hero.jsx'
import Blogs from '../blogs/Blogs.jsx'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-20">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative backdrop-blur-lg rounded-2xl border border-slate-700/30 bg-slate-900/80 shadow-2xl shadow-purple-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-stripes.png')] opacity-10 mix-blend-soft-light" />
          <Hero />
        </div>

        {/* Blogs Section */}
        <div className="mt-16 space-y-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent text-center">
            Latest Insights
          </h2>
            <Blogs />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  )
}

export default Home