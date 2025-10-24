"use client"

import Image from "next/image"

interface Author {
  name: string
  avatar?: string
  title?: string
  bio?: string
}

interface AuthorInfoProps {
  author: Author
  className?: string
}

export default function AuthorInfo({ author, className = "" }: AuthorInfoProps) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Tác giả</h3>
      <div className="flex items-start gap-3">
        <Image
          src={author.avatar || "/avatar-default.png"}
          alt={author.name}
          fill
          className="w-12 h-12 rounded-full object-cover shrink-0"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{author.name}</h4>
          {author.title && <p className="text-sm text-[#2E8BC0] font-medium mb-2">{author.title}</p>}
          {author.bio && <p className="text-sm text-gray-600 leading-relaxed">{author.bio}</p>}
        </div>
      </div>
    </div>
  )
}
