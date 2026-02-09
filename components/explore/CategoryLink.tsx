import { CategoryType } from '@/lib/types'
import Link from 'next/link'
import React from 'react'

const CategoryLink = ({category}:{category: CategoryType}) => {
  return (
    <Link href={`/explore/${category.slug}`} className='text-sm text-black/90 font-normal font-sans bg-gray-100/90 rounded-4xl px-4 py-[8px] min-w-fit'>
      {category.name}
    </Link>
  )
}

export default CategoryLink