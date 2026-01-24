'use client'

import Link from 'next/link'
import { Bell, Menu, Search, SquarePen, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useAuth } from '@/lib/contexts/authContext'
import Image from 'next/image'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { usePathname, useRouter } from 'next/navigation'
import { addRecentSearch } from '@/lib/utils'
import { useSideBarActive } from '@/lib/contexts/sidebardContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {user, loading} = useAuth()
  const [query, setQuery] = useState('');
  const {isActive, setIsActive} = useSideBarActive() 
  const router = useRouter();
  const pathname = usePathname()

    const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
        if(query !== ''){
            router.push(`/search/search-results/${query}`)
            addRecentSearch(query);
        }
    }
    
  if (pathname == '/write') return null;
  return (
    <nav className={`sticky top-0 z-50 md:border-b border-gray-100 ${pathname == '/' ? 'bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/40' : 'bg-white'}`}>
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-2 md:px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <button className='hidden md:block' onClick={() => setIsActive(!isActive)}>
              <Menu strokeWidth={1} className='size-6 text-black' />
            </button>
            <Link href="/" className="text-3xl font-bold text-emerald-700 transition-colors hover:text-emerald-700">
              Inspirely
            </Link>
          </div>
          <form onSubmit={handleFormSubmit} className="focus-within:border focus-within:border-emerald-700 hidden md:flex w-[240px] h-[40px] rounded-4xl bg-gray-100/90 items-center justify-between overflow-hidden pl-3">
            <button type='submit' className="flex items-center justify-center mr-2 cursor-pointer">
                <Search strokeWidth={1} className="size-[19px] text-emerald-700" />
            </button>
            <input 
              onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className="h-full w-[85%] bg-transparent placeholder:text-foreground placeholder:font-light outline-0 stroke-0 border-0" />
          </form>
        </div>

        {user ? (
            <div className='flex items-center gap-5 md:gap-8'>
              <Link href='#' className='hidden md:block'>
                <div className="flex gap-2 items-center group">
                  <SquarePen strokeWidth={1} className='size-5.5 text-black/75 group-hover:text-black transition-all duration-200 ease-in-out' />
                  <p className='text-[16px] font-light text-black/75 group-hover:text-black transition-all duration-200 ease-in-out'>Write</p>
                </div>
              </Link>
              <Link href='#'>
                <Bell strokeWidth={1} className='size-5.5 text-black/70 hover:text-black transition-all duration-200 ease-in-out' />
              </Link>
              <button className='size-[30px] rounded-full overflow-hidden cursor-pointer relative'>
                <Image
                className='object-cover'
                fill
                sizes="(max-width: 768px) 100px, 100px"
                src={user.profile_pic_url || defaultAvatar}
                loading='eager'
                placeholder='blur'
                blurDataURL='/assets/images/default-avatar.png'
                alt='Profle Picture'
                />
              </button>
            </div>
          ):(
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/write"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Write
          </Link>
          <Link
            href="/stories"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Stories
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-emerald-700 px-6 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-emerald-700"
              >
                Get started
              </Link>
            </div>
        </div>)}


        {!user && (
          <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (<X className="h-6 w-6 text-foreground" />) : (<Menu className="h-6 w-6 text-foreground" />)}
        </button>
        )}
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/write"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Write
            </Link>
            <Link
              href="/stories"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-emerald-700 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
