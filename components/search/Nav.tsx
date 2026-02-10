'use client'
import { addRecentSearch } from '@/lib/utils'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState, FormEvent } from 'react'

const Nav = () => {
    const pathname = usePathname()
    const router = useRouter()
    const q = useSearchParams().get('q')
    const [query, setQuery] = useState('');


    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
          if(query !== ''){
              router.push(`/search/?q=${query}`)
              addRecentSearch(query);
          }
      }

  return (
    <div className="w-full pt-6 lg:pt-14 bg-white">
        <form onSubmit={handleFormSubmit} className="border focus-within:border-emerald-700 border-gray-200 lg:hidden flex w-full h-[40px] rounded-4xl bg-white items-center justify-between overflow-hidden pl-3 mb-6">
            <button type='submit' className="flex items-center justify-center mr-2 cursor-pointer">
                <Search strokeWidth={1} className="size-[19px] text-gray-700" />
            </button>
            <input 
              onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className="h-full w-[95%] bg-transparent placeholder:text-gray-600 placeholder:font-light outline-0 stroke-0 border-0" defaultValue={q || ''} />
        </form>
        <h1 className='text-black/60 text-2xl lg:text-4xl font-semibold font-sans tracking-tight'>Results for <span className='text-black'>{q}</span></h1>
         <nav className="w-full py-4 pt-6 md:pt-10 bg-white sticky top-10 border-b border-gray-100 overflow-hidden z-200">
            <div className='min-w-full flex items-center gap-4 lg:gap-8 bg-white overflow-x-auto'>
            <Link href={`/search/?q=${q}`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/search' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/search' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Articles</p>
                </div>
            </Link>
            <Link href={`/search/people/?q=${q}`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/search/people' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/search/people' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>People</p>
                </div>
            </Link>
            <Link href={`/search/categories/?q=${q}`}>
                <div className={`px-5 py-1 rounded-4xl min-w-[100px] border ${pathname == '/search/categories' ? 'bg-emerald-700/90 border-emerald-700/90' : 'bg-white border-black/60'} text-white flex items-center justify-center hover:bg-emerald-700 hover:border-emerald-700 group transition-all duration-300 ease-in-out`}>
                    <p className={`text-sm md:text-[16px] font-sans group-hover:text-white ${pathname == '/search/categories' ? 'text-white' : 'text-black/60'} transition-all duration-300 ease-in-out`}>Categories</p>
                </div>
            </Link>
            </div>
        </nav>
    </div>
  )
}

export default Nav