import CategoriesResult from '@/components/search/CategoriesResult'
import Nav from '@/components/search/Nav'
import PostsResult from '@/components/search/PostsResult'
import SearchCategoriesSidebar from '@/components/search/SearchCategoriesSidebar'
import React from 'react'

const CategorySearchResultPage = () => {
  return (
    <div className='w-full bg-white'>
        <div className="w-full flex items-start">
            <div className="w-full lg:w-[70%] lg:pr-10">
                <Nav/>
                <CategoriesResult />
            </div>
            <SearchCategoriesSidebar />
        </div>
    </div>
  )
}

export default CategorySearchResultPage