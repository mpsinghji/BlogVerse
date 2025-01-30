import React from 'react'

const Search = ({search, handleSearchChange, handleSearch}) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }
  return (
    <div className='w-full flex'>
        <input type='text'
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className='w-full py-2 px-4 mr-5 border border-gray-300 bg-[#f7f8f9] rounded-md'
        placeholder='Search for blogs'
        />
        <button className='bg-[#1E73BE] px-4 py-2 text-white'>Search</button>
    </div>
  )
}

export default Search