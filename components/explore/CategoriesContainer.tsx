'use client';
import { useFetchCategories } from '@/lib/queries';
import Link from 'next/link';
import React from 'react'
import { CategorySkeleton } from '../skeletons/CategorySkeleton';

const CategoriesContainer = () => {
    const {data:categories, isLoading, isError} = useFetchCategories()

  return (
    <div className="w-full border-y border-gray-100 py-10 mt-14">
        <h3 className='text-xl lg:text-2xl font-semibold font-sans'>All Categories</h3>
        {isLoading && (
            <CategorySkeleton />
        )}
        {isError && (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <p className='text-xs font-sans text-black/60'>Oops! Failed to load categories.</p>
            </div>
        )}
        <div className="w-full flex items-center gap-6 lg:gap-10 flex-wrap mt-6">
            {categories && categories.map((cat) => (
                <Link href={`/explore/${cat.slug}`} className='font-sans text-black/80 text-sm lg:text-base hover:underline hover:text-black'>{cat.name}</Link>
            ))}
        </div>
    </div>
  )
}

export default CategoriesContainer