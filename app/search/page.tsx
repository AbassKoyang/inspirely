import Nav from '@/components/search/Nav'
import PostsResult from '@/components/search/PostsResult'
import SearchPostSidebar from '@/components/search/SearchPostsSidebar'
import React from 'react'

const SearchResultPage = () => {
  return (
    <div className='w-full bg-white'>
        <div className="w-full flex items-start">
            <div className="w-full lg:w-[70%] lg:pr-10 lg:border-r lg:border-gray-100">
                <Nav/>
                <PostsResult />
            </div>
            <SearchPostSidebar />
        </div>
    </div>
  )
}

export default SearchResultPage