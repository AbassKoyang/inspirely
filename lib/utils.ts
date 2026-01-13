import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const STORAGE_KEY = "recent_searches";
const MAX_RECENT = 5;

export const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addRecentSearch = (keyword: string) => {
  if (!keyword.trim()) return;

  let searches = getRecentSearches();

  searches = searches.filter((item) => item.toLowerCase() !== keyword.toLowerCase());

  searches.unshift(keyword);

  if (searches.length > MAX_RECENT) {
    searches = searches.slice(0, MAX_RECENT);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
};

export const deleteRecentSearch = (keyword: string) => {
    let searches = getRecentSearches();
    searches = searches.filter((item) => item.toLowerCase() !== keyword.toLowerCase());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  };
  
export const clearRecentSearches = () => {
localStorage.removeItem(STORAGE_KEY);
};

export const formatFollowersCount = (count: number): string => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(count);
};
