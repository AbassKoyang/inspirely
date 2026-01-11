'use client';
import { Frown } from 'lucide-react';
import Link from 'next/link'; 
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link
        href="/"
        className="mt-4 group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-medium text-white transition-all hover:scale-105 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/50"
      >
        Go Home
      </Link>
    </main>
  );
}