'use client'

import Link from 'next/link'
import { Bell, Menu, Search, SquarePen, X } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useAuth } from '@/lib/contexts/authContext'
import Image from 'next/image'
import defaultAvatar from '@/public/assets/images/default-avatar.png'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addRecentSearch } from '@/lib/utils'
import { useSideBarActive } from '@/lib/contexts/sidebardContext'
import ProfileDropdown from './ProfileDropdown'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {user, loading} = useAuth()
  const [query, setQuery] = useState('');
  const {isActive, setIsActive} = useSideBarActive() 
  const router = useRouter();
  const pathname = usePathname()
  const q = useSearchParams().get('q');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

    const handleFormSubmit = (e: FormEvent) => {
      e.preventDefault();
        if(query !== ''){
            router.push(`/search/?q=${query}`)
            addRecentSearch(query);
        }
    }
    
  if (pathname == '/write') return null;
  if (pathname.startsWith('/edit')) return null;
  return (
    <nav className={`sticky top-0 z-50 md:border-b border-gray-100 ${pathname == '/' ? 'bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/40' : 'bg-white'} z-300`}>
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-2 md:px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 lg:gap-4">
            <button className={`${pathname !== '/' ? 'hidden md:block' : 'hidden'}`} onClick={() => setIsActive(!isActive)}>
              <Menu strokeWidth={1} className='size-6 text-black' />
            </button>
            <Link href="/" className="flex items-center justify-center font-medium md:hidden">
              <div className="bg-emerald-700 text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={`fill-white transition-all duration-200 ease-in-out`} d="M5.83333 15.8975C5.41236 15.8975 5.04938 15.7517 4.74438 15.46C4.43938 15.1683 4.27354 14.812 4.24688 14.391H7.41979C7.39313 14.812 7.22729 15.1683 6.92229 15.46C6.61729 15.7517 6.25431 15.8975 5.83333 15.8975ZM3.33333 13.2371C3.15597 13.2371 3.0075 13.1773 2.88792 13.0577C2.76819 12.938 2.70833 12.7894 2.70833 12.6121C2.70833 12.4347 2.76819 12.2863 2.88792 12.1667C3.0075 12.0469 3.15597 11.9871 3.33333 11.9871H8.33333C8.5107 11.9871 8.65917 12.0469 8.77875 12.1667C8.89847 12.2863 8.95833 12.4347 8.95833 12.6121C8.95833 12.7894 8.89847 12.938 8.77875 13.0577C8.65917 13.1773 8.5107 13.2371 8.33333 13.2371H3.33333ZM2.83646 10.8333C1.96368 10.2906 1.27278 9.58139 0.76375 8.70584C0.254583 7.83042 0 6.87292 0 5.83333C0 4.20945 0.56625 2.83125 1.69875 1.69875C2.83125 0.56625 4.20944 0 5.83333 0C7.45722 0 8.83542 0.56625 9.96792 1.69875C11.1004 2.83125 11.6667 4.20945 11.6667 5.83333C11.6667 6.87292 11.4121 7.83042 10.9029 8.70584C10.3939 9.58139 9.70299 10.2906 8.83021 10.8333H2.83646Z" fill=""/>
              </svg>
              </div>
            </Link>
            <Link href="/" className="text-2xl font-semibold lg:text-3xl lg:font-bold text-emerald-700 transition-colors hover:text-emerald-700">
              Inspirely
            </Link>
          </div>
          <form onSubmit={handleFormSubmit} className="focus-within:border focus-within:border-emerald-700 hidden md:flex w-[240px] h-[40px] rounded-4xl bg-gray-100/90 items-center justify-between overflow-hidden pl-3">
            <button type='submit' className="flex items-center justify-center mr-2 cursor-pointer">
                <Search strokeWidth={1} className="size-[19px] text-emerald-700" />
            </button>
            <input 
              onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className="h-full w-[85%] bg-transparent placeholder:text-foreground placeholder:font-light outline-0 stroke-0 border-0" defaultValue={q || ''} />
          </form>
        </div>

        {user ? (
            <div className='flex items-center gap-5 md:gap-8'>
              <Link href='/write' className='hidden md:block'>
                <div className="flex gap-2 items-center group">
                  <SquarePen strokeWidth={1} className='size-5.5 text-black/75 group-hover:text-black transition-all duration-200 ease-in-out' />
                  <p className='text-[16px] font-light text-black/75 group-hover:text-black transition-all duration-200 ease-in-out'>Write</p>
                </div>
              </Link>
              <Link href='/me/notifications'>
                <Bell strokeWidth={1} className='size-5.5 text-black/70 hover:text-black transition-all duration-200 ease-in-out' />
              </Link>
              <div className="relative">
                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className={`size-[33px] rounded-full overflow-hidden cursor-pointer relative ${isProfileDropdownOpen ? 'outline-2 outline-offset-1 outline-emerald-700' : 'outline-0'}`}>
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
                <ProfileDropdown user={user} isOpen={isProfileDropdownOpen} />
              </div>
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
        <div className="border-border bg-background md:hidden pt-14 fixed left-0 top-0 z-[-1] w-full">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="#"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Write
            </Link>
            <Link
              href="#"
              className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              href="#"
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
