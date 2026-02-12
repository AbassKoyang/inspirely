'use client';
import { CategoryType } from '@/lib/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const CategoryLink = ({category}:{category: CategoryType}) => {
  const pathname = usePathname();
  return (
    <Link href={`/explore/${category.slug}`} className={`text-sm text-black/90 font-normal font-sans bg-gray-100/90 rounded-4xl px-4 py-[8px] min-w-fit border  ${pathname == `/explore/${category.slug}` ? 'border-black' : 'border-gray-100/10'}`}>
      {category.name}
    </Link>
  )
}

export default CategoryLink