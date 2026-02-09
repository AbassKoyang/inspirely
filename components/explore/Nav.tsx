'use client'
import React, { useState, useEffect } from 'react'
import CategoryLink from './CategoryLink'
import { useFetchCategories } from '@/lib/queries'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '../ui/carousel'

const Nav = () => {
    const {data:categories, isLoading, isError} = useFetchCategories()
    const pathname = usePathname()
    const [api, setApi] = useState<CarouselApi>();
    const [canScrollNext, setCanScrollNext] = useState(true)
    const [canScrollPrev, setCanScrollPrev] = useState(false)


    useEffect(() => {
    if (!api) return

    const checkEdges = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    checkEdges()

    api.on("select", checkEdges)
    api.on("reInit", checkEdges)
  }, [api])

  return (
    <nav className="w-full bg-white py-6 overflow-x-hidden relative">
        {isLoading && (
            <p>Loading...</p>
        )}
        {isError && (
            <p>An eror occured</p>
        )}

        <button disabled={!canScrollPrev} onClick={() => api && api.scrollPrev()} className='w-[80px] px-1 h-full bg-linear-to-r from-white via-white/90 to-white/30 flex items-center justify-start cursor-pointer disabled:hidden absolute top-[50%] translate-y-[-50%] left-0 z-30'>
            <ChevronLeft strokeWidth={1} className='text-[#333333] size-[20px]' />
        </button>
        <button disabled={!canScrollNext} onClick={() => api && api.scrollNext()} className='w-[80px] px-1 bg-linear-to-l from-white via-white/90 to-white/30 h-full flex items-center justify-end cursor-pointer disabled:hidden absolute top-[50%] translate-y-[-50%] right-0 z-30'>
            <ChevronRight strokeWidth={1} className='text-[#333333] size-[20px]' />
        </button>

        <div className="w-full">
            <Carousel
                setApi={setApi}
            opts={{
                align: "start",
            }}
            className="w-full z-20"
            draggable
            >
                <CarouselContent className='w-full flex items-center'>
                    <CarouselItem className="basis-auto lg:basis-auto shrink-0">
                        <Link href={``} className={`text-sm text-black/90 font-normal font-sans bg-gray-100/90 rounded-4xl p-[8px] min-w-fit flex gap-2 items-center jusify-center  border ${pathname == '/explore' ? 'border-black' : 'border-gray-100/10'}`}>
                            <div className="p-1 bg-black rounded-full">
                                <svg className={`stroke-white size-[12px]`}  width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.8001 2.1L7.87009 4.59C6.42009 4.95 4.95009 6.42 4.59009 7.87L2.10009 17.8C1.35009 20.8 3.19009 22.65 6.20009 21.9L16.1301 19.42C17.5701 19.06 19.0501 17.58 19.4101 16.14L21.9001 6.2C22.6501 3.2 20.8001 1.35 17.8001 2.1Z"  strokeWidth="1.5"strokeLinecap="round" strokeLinejoin="round"/><path d="M12.0001 15.5C13.9331 15.5 15.5001 13.933 15.5001 12C15.5001 10.067 13.9331 8.5 12.0001 8.5C10.0671 8.5 8.50009 10.067 8.50009 12C8.50009 13.933 10.0671 15.5 12.0001 15.5Z"  strokeWidth="1.5"strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <p className='text-sm text-black/90 font-normal font-sans hidden lg:block'>Explore categories</p>
                        </Link>
                    </CarouselItem>
                    {categories && categories.map((cat) => (
                        <CarouselItem className="basis-auto lg:basis-auto shrink-0">
                         <CategoryLink category={cat} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    </nav>
  )
}

export default Nav