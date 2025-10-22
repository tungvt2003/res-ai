"use client"
import About from "./modules/home/components/About"
import HeroCarousel from "./modules/home/components/HeroCarousel"
import HowItWorks from "./modules/home/components/HowItWorks"
import Ophthalmologist from "./modules/home/components/Ophthalmologist"

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
