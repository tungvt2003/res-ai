"use client"

import About from "@/components/home/components/About"
import HeroCarousel from "@/components/home/components/HeroCarousel"
import HowItWorks from "@/components/home/components/HowItWorks"
import Ophthalmologist from "@/components/home/components/Ophthalmologist"

const mentors = [
  {
    id: "f304d44a-97e4-4c34-b80f-da2a73488cff",
    fullName: "ThS. Phạm Thị Dung23",
    academicTitle: "ThS",
    workUnit: "Khoa Công nghệ Thông tin",
    position: "Giảng viên",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/scientist/Nguyen_Thanh_Hung_6.jpg",
    website: "https://example.com/pham-thi-dung",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T17:38:05.242Z",
    keywords: [
      {
        id: "ddda07ce-d94d-41d9-bf19-8ab3da356603",
        name: "Kiểm soát cảm xúc trong học tập",
        createdAt: "2025-10-22T16:30:20.583Z",
        updatedAt: "2025-10-22T16:30:20.583Z",
      },
      {
        id: "cefcd34b-673b-42bd-a6ff-c8b4e638fa0a",
        name: "Kỹ năng giải quyết vấn đề",
        createdAt: "2025-10-22T16:30:20.583Z",
        updatedAt: "2025-10-22T16:30:20.583Z",
      },
      {
        id: "c8bfda0c-6672-4718-a4de-21e65ba6117f",
        name: "Kỹ năng quản lý thời gian",
        createdAt: "2025-10-22T16:30:20.583Z",
        updatedAt: "2025-10-22T16:30:20.583Z",
      },
    ],
  },
  {
    id: "c30e0326-3ea6-4b7c-a6d2-b3e9ad3b8e65",
    fullName: "GS.TS. Hoàng Văn Em",
    academicTitle: "GS",
    workUnit: "Khoa Khoa học Máy tính",
    position: "Giáo sư",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/scientist/Thăng_Lê_Văn_Thăng_2013.jpg",
    website: "https://example.com/hoang-van-em",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
  {
    id: "b94e3850-dab0-411e-9ff9-fa1a266ba308",
    fullName: "TS. Lê Văn Cường",
    academicTitle: "TS",
    workUnit: "Khoa Khoa học Máy tính",
    position: "Trưởng Bộ môn AI",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/scientist/Picture2.png",
    website: "https://example.com/le-van-cuong",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
  {
    id: "1943fffb-30d0-44f2-af63-d7f4f0a8231a",
    fullName: "PGS.TS. Nguyễn Văn An",
    academicTitle: "PGS",
    workUnit: "Khoa Công nghệ Thông tin",
    position: "Phó Trưởng khoa",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/2024/2/Screen_Shot_2024-02-02_at_00_27_06.png",
    website: "https://example.com/nguyen-van-an",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
  {
    id: "03295f76-2685-4b5f-815f-30c17b6e4c48",
    fullName: "TS. Trần Thị Bình",
    academicTitle: "TS",
    workUnit: "Khoa Công nghệ Thông tin",
    position: "Giảng viên chính",
    image: "https://csdlkhoahoc.hueuni.edu.vn/data/2024/8/eec6506ee043441d1d522.jpg",
    website: "https://example.com/tran-thi-binh",
    isActive: true,
    createdAt: "2025-10-22T16:51:15.867Z",
    updatedAt: "2025-10-22T16:51:15.867Z",
    keywords: [],
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
      <main className="flex-grow pt-20 relative">
        <HeroCarousel />
        <About />
        <Ophthalmologist data={mentors} />
        <HowItWorks />
      </main>
    </div>
  )
}
