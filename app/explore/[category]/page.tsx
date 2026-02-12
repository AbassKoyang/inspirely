'use client'
import CategoryPostsContainer from '@/components/explore/CategoryPostsContainer'
import { useFetchCategory } from '@/lib/queries'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

const CategoryExplorePage = () => {
    const categorySlug = useParams<{category:string}>().category
    const {data:category} = useFetchCategory(categorySlug || '')
    const pathname = usePathname()
    const router = useRouter()

  return (
    <div className='w-full bg-white'>
      {category && (
        <>
          <div className="w-full flex items-center justify-center flex-col mt-5 lg:mt-10">
          <h1 className='text-2xl lg:text-4xl font-semibold font-sans'>{category.name}</h1>
          
          <div className="flex items-center gap-3 mt-2 lg:mt-4">
            <p className='font-sans text-gray-600 text-sm lg:text-base'>Topic</p>
            <div className="size-[2px] rounded-full bg-black/60"></div>
            <p className='font-sans text-gray-600 text-sm lg:text-base'>{category.posts_count} articles</p>
          </div>
        </div>

        <CategoryPostsContainer category={category} />
        </>
      )}
    </div>
  )
}

export default CategoryExplorePage