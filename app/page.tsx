'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  PenTool,
  Pen,
  Pencil,
  Edit,
  FileEdit,
  FileText,
  Book,
  Notebook,
  NotebookPen,
  Type,
  Quote,
  Feather,
  ScrollText,
  Newspaper,
  FilePenLine
} from 'lucide-react'

const WritingIconGrid = () => {
  const gridCols = 30
  const gridRows = 15
  
  const iconComponents = [
    PenTool,
    Pen,
    Pencil,
    Edit,
    FileEdit,
    FileText,
    BookOpen,
    Book,
    Notebook,
    NotebookPen,
    Type,
    Quote,
    Feather,
    ScrollText,
    Newspaper,
    FilePenLine,
  ]

  const gridItems = useMemo(() => {
    const items = []
    
    for (let i = 0; i < gridRows * gridCols; i++) {
      const randomIcon = iconComponents[Math.floor(Math.random() * iconComponents.length)]
      items.push({
        id: i,
        Icon: randomIcon,
      })
    }
    return items
  }, [])

  // const [hoveredItems, setHoveredItems] = useState<Set<number>>(new Set())
  // const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set())
  // const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map())

  // const handleMouseEnter = (id: number) => {
  //   const existingTimeout = timeoutRefs.current.get(id)
  //   if (existingTimeout) {
  //     clearTimeout(existingTimeout)
  //     timeoutRefs.current.delete(id)
  //   }
    
  //   setHoveredItems((prev) => new Set(prev).add(id))
  //   setRevealedItems((prev) => new Set(prev).add(id))
  // }

  // const handleMouseLeave = (id: number) => {
  //   setHoveredItems((prev) => {
  //     const newSet = new Set(prev)
  //     newSet.delete(id)
  //     return newSet
  //   })
    
  //   const timeout = setTimeout(() => {
  //     setRevealedItems((prev) => {
  //       const newSet = new Set(prev)
  //       newSet.delete(id)
  //       return newSet
  //     })
  //     timeoutRefs.current.delete(id)
  //   }, 500)
    
  //   timeoutRefs.current.set(id, timeout)
  // }

  return (
    <div className="absolute inset-0 z-10 grid grid-rows-15 grid-cols-30 gap-0 pointer-events-none">
      {gridItems.map((item) => <IconBox key={item.id} icon={item.Icon}/>)}
    </div>
  )
}

const IconBox = ({icon}:{icon: any}) => {
  const [isHovered, setisHovered] = useState(false)
  const Icon = icon
  const handleMouseEnter = () => {
    setisHovered(true)
  }
  const handleMouseLeave = () => {
    setTimeout(() => {
      setisHovered(false)
    }, 500);
  }
  return (
    <div
      className="relative col-span-1 row-span-1 aspect-square flex items-center justify-center border border-transparent pointer-events-auto group"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <Icon
      strokeWidth={1}
        className={`h-3 w-3 md:h-6 md:w-6  transition-all duration-300 ease-in-out ${isHovered? 'opacity-100 text-emerald-500' : 'opacity-20 text-emerald-500/60'}`}
      />
    </div>
  )
}

const Home = () => {
  const featuredPosts = [
    {
      title: "The Future of Writing in the Digital Age",
      excerpt: "Exploring how technology is reshaping the way we write, read, and share stories.",
      author: "Sarah Chen",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      title: "Finding Your Voice as a Writer",
      excerpt: "A guide to discovering and developing your unique writing style that resonates with readers.",
      author: "Michael Torres",
      date: "Mar 12, 2024",
      readTime: "7 min read",
      category: "Writing"
    },
    {
      title: "Building a Community Through Stories",
      excerpt: "How storytelling connects people and creates meaningful communities in our digital world.",
      author: "Emily Johnson",
      date: "Mar 10, 2024",
      readTime: "6 min read",
      category: "Community"
    }
  ]

  const trendingTopics = [
    "Technology",
    "Writing",
    "Productivity",
    "Design",
    "Business",
    "Culture",
    "Science",
    "Philosophy"
  ]

  return (
    <div className="min-h-full bg-background">
      <section className="relative overflow-hidden px-6 py-20 md:py-18 lg:px-8">
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        <WritingIconGrid />
        <div className="relative z-10 mx-auto max-w-fit text-center bg-transparent">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Welcome to Inspirely</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Ideas worth
            <span className="block bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              sharing
            </span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Discover stories, insights, and perspectives from writers around the world. 
            Join a community where meaningful ideas flourish.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-medium text-white transition-all hover:scale-105 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/50"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-transparent px-8 py-4 text-base font-medium text-emerald-600 transition-all hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 px-6 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground">10K+</div>
              <div className="mt-2 text-muted-foreground">Stories published</div>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground">50K+</div>
              <div className="mt-2 text-muted-foreground">Active readers</div>
            </div>
            
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-foreground">1M+</div>
              <div className="mt-2 text-muted-foreground">Monthly reads</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Featured stories</h2>
            <Link
              href="/stories"
              className="hidden items-center gap-2 text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <article
                key={index}
                className="group cursor-pointer space-y-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    {post.category}
                  </span>
                  <span className="text-muted-foreground">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                  {post.title}
                </h3>
                
                <p className="line-clamp-3 text-muted-foreground">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-primary/60"></div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{post.author}</div>
                      <div className="text-xs text-muted-foreground">{post.date}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 px-6 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">Trending topics</h2>
          
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic, index) => (
              <Link
                key={index}
                href={`/topics/${topic.toLowerCase()}`}
                className="group rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
            Start writing today
          </h2>
          <p className="mb-10 text-lg text-muted-foreground md:text-xl">
            Share your thoughts with the world. Join thousands of writers who are already publishing on Inspirely.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-base font-medium text-white transition-all hover:scale-105 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/50"
          >
            Create your account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
