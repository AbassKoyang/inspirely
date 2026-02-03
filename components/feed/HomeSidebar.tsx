'use client'

import RecommendedTopics from "./RecommendedTopics"
import StaffPicks from "./StaffPicks"
import Whotofollow from "./Whotofollow"

const HomeSidebar = () => {

  return (
    <div className="w-[30%] bg-white h-full pl-10 pt-10">
        <StaffPicks />
        <RecommendedTopics />
        <Whotofollow />
    </div>
  )
}

export default HomeSidebar