import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RES-AI.EDU",
  description: "AI-Powered Eye Disease Detection and Analysis",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
