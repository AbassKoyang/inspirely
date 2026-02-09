'use client';
import { useFetchCategories } from '@/lib/queries';
import Link from 'next/link';
import React from 'react'

const CategoriesContainer = () => {
    const {data:categories, isLoading, isError} = useFetchCategories()

  return (
    <div className="w-full border-y border-gray-100 py-10 mt-14">
        <h3 className='text-xl lg:text-2xl font-semibold font-sans'>All Categories</h3>
        {isLoading && (
        <p>Loading...</p>
        )}
        {isError && (
            <p>An eror occured</p>
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