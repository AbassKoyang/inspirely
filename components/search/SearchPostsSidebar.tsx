'use client'

import MatchingCategories from "./MatchingTopics"

const SearchPostSidebar = () => {

  return (
    <div className="w-[30%] bg-white min-h-dvh pl-10 pt-0 hidden lg:block">
        <MatchingCategories/>
    </div>
  )
}

export default SearchPostSidebar