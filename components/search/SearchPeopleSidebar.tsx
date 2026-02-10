'use client'

import MatchingPosts from "./MatchingPosts"
import MatchingCategories from "./MatchingTopics"

const SearchPeopleSidebar = () => {

  return (
    <div className="w-[30%] bg-white min-h-dvh pl-10 pt-0 hidden lg:block lg:border-l lg:border-gray-100">
        <MatchingPosts/>
        <MatchingCategories/>
    </div>
  )
}

export default SearchPeopleSidebar