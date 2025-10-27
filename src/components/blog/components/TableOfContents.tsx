"use client"

import { useEffect, useState } from "react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export default function TableOfContents({ content, className = "" }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeSection, setActiveSection] = useState<string>("")

  // Tạo TOC từ các thẻ h2, h3
  useEffect(() => {
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content

    const headings = tempDiv.querySelectorAll("h2")
    const toc: TOCItem[] = []

    headings.forEach((heading, index) => {
      const id = `heading-${index}`
      toc.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      })
    })

    setTocItems(toc)
  }, [content])

  // Gán ID cho các heading thực tế trong DOM sau khi component đã mount
  useEffect(() => {
    if (tocItems.length === 0) return

    // Sử dụng setTimeout để đảm bảo DOM đã được render
    const timer = setTimeout(() => {
      const actualHeadings = document.querySelectorAll(".blog-content h2")
      actualHeadings.forEach((heading, index) => {
        if (index < tocItems.length) {
          heading.id = tocItems[index].id
        }
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [tocItems])

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Tính toán chiều cao header động
      const header = document.querySelector("header") || document.querySelector('[class*="fixed"]')
      const headerHeight = header ? header.offsetHeight : 80 // fallback 80px

      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerHeight - 20 // thêm 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveSection(id)
    }
  }

  // Intersection Observer để theo dõi section đang active
  useEffect(() => {
    if (tocItems.length === 0) return

    // Tính toán chiều cao header để điều chỉnh rootMargin
    const header = document.querySelector("header") || document.querySelector('[class*="fixed"]')
    const headerHeight = header ? header.offsetHeight : 80
    const topMargin = headerHeight + 20 // header height + padding

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${topMargin}px 0px -70% 0px`,
        threshold: 0,
      },
    )

    // Sử dụng setTimeout để đảm bảo các heading đã có ID
    const timer = setTimeout(() => {
      tocItems.forEach(item => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.observe(element)
        }
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      tocItems.forEach(item => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [tocItems])

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className={`bg-white rounded-xl py-4 px-2 md:p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 px-3">Mục lục</h3>

      <nav className="space-y-1">
        {tocItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`toc-item cursor-pointer block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              item.level === 3 ? "ml-4" : ""
            } ${
              activeSection === item.id
                ? "bg-[#2E8BC0] text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#2E8BC0]"
            }`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  )
}
