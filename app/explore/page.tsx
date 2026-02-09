import CategoriesContainer from '@/components/explore/CategoriesContainer'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ExplorePage = () => {
  return (
    <div className='w-full bg-white'>
      <div className="w-full flex items-center justify-center flex-col mt-5 lg:mt-10">
        <h1 className='text-2xl lg:text-4xl font-semibold font-sans'>Explore Inspirely</h1>
        <form className="mt-4 lg:mt-6 focus-within:border focus-within:border-emerald-700 flex w-full lg:w-2xl h-[45px] lg:h-[65px] rounded-[60px] lg:rounded-[65px] bg-gray-100/90 items-center justify-between overflow-hidden pl-3 lg:pl-5">
          <button type='submit' className="flex items-center justify-center mr-3 cursor-pointer">
              <Search strokeWidth={1} className="size-[22px] text-emerald-700" />
          </button>
          <input type="text" placeholder="Search anything..." className="h-full w-[95%] placeholder:text-gray-600 placeholder:font-normal outline-0 stroke-0 border-0 text-sm lg:text-base" />
        </form>
        <div className="flex items-center gap-3 mt-5">
          <p className='font-sans text-gray-600 text-xs lg:text-sm'>Recommended:</p>
          <Link href='/explore/self-improvement' className='font-sans text-black text-xs lg:text-sm hover:underline'>Self Improvement</Link>
          <Link href='/explore/politics' className='font-sans text-black text-xs lg:text-sm hover:underline'>Politics</Link>
          <Link href='/explore/technology' className='font-sans text-black text-xs lg:text-sm hover:underline'>Technology</Link>
        </div>
      </div>

      <CategoriesContainer />

      <div className="my-14 w-full flex flex-col md:flex-row items-center justify-center gap-3 py-3.5 bg-gray-100/90 rounded-sm lg:rounded-xs">
        <p className='font-sans text-black/90 text-sm'>See a topic you think should be added or removed here?</p>
        <Link href='#' className='font-sans text-black text-sm underline'>Suggest an edit</Link>
      </div>
    </div>
  )
}

export default ExplorePage