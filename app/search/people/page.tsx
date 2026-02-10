import CategoriesResult from '@/components/search/CategoriesResult'
import Nav from '@/components/search/Nav'
import PeopleResults from '@/components/search/PeopleResults'
import PostsResult from '@/components/search/PostsResult'
import SearchCategoriesSidebar from '@/components/search/SearchCategoriesSidebar'
import SearchPeopleSidebar from '@/components/search/SearchPeopleSidebar'
import React from 'react'

const PeopleSearchResultPage = () => {
  return (
    <div className='w-full bg-white'>
        <div className="w-full flex items-start">
            <div className="w-full lg:w-[70%] lg:pr-10">
                <Nav/>
                <PeopleResults />
            </div>
            <SearchPeopleSidebar />
        </div>
    </div>
  )
}

export default PeopleSearchResultPage