"use client"

import About from "@/components/home/components/About"
import HeroCarousel from "@/components/home/components/HeroCarousel"
import HowItWorks from "@/components/home/components/HowItWorks"
import Ophthalmologist from "@/components/home/components/Ophthalmologist"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <main className="flex-grow pt-20 relative">
        <HeroCarousel />
        <About />
        <Ophthalmologist />
        <HowItWorks />
      </main>
    </div>
  )
}
