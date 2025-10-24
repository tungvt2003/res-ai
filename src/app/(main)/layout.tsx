import Footer from "@/components/home/components/Footer"
import Header from "@/components/home/components/Header"
import type { Metadata } from "next"
import "../globals.css"
import Providers from "../providers"

export const metadata: Metadata = {
  title: "Res AI",
  description: "AI-Powered Eye Disease Detection and Analysis",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header />
      {children}
      <Footer />
    </Providers>
  )
}
