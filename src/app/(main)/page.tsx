"use client"

import About from "@/components/home/components/About"
import Blog from "@/components/home/components/Blog"
import HeroCarousel from "@/components/home/components/HeroCarousel"
import ListMentor from "@/components/home/components/ListMentor"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <main className="flex-grow pt-20 relative">
        <HeroCarousel />
        <About />
        <ListMentor />
        <Blog />
      </main>
    </div>
  )
}
