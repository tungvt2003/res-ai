"use client"
import TreeView from "@/components/modules/res/components/TreeView"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

// Mock data - replace with actual API call
const mockData = {
  data: {
    id: "646946ff-e2b9-4dfa-bea1-592964a44e69",
    key: "tam_ly_hoc",
    name: "Tâm Lý Học",
    value_jsonb: {
      parents: [
        {
          id: "1761226810945-gw0sv6vox",
          name: "Tâm lý học",
          topics: [
            {
              id: "1761226826696-pbpr1e6ut",
              name: "Sức khoẻ tầm thần và cảm xúc cá nhân",
              fields: [
                {
                  id: "1761226867124-swv902449",
                  name: "Sức khoẻ tâm thần (Mental healthy)",
                  lecturers: [
                    {
                      id: "1943fffb-30d0-44f2-af63-d7f4f0a8231a",
                      name: "PGS.TS. Nguyễn Văn An",
                      image: null,
                      website: "https://example.com/nguyen-van-an",
                      isActive: true,
                      position: "Phó Trưởng khoa",
                      workUnit: "Khoa Công nghệ Thông tin",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "PGS",
                    },
                  ],
                },
                {
                  id: "1761226885361-1u4gj0jbt",
                  name: "Sức khoẻ tâm thần thanh thiếu niên (Adolescent mental health)",
                  lecturers: [
                    {
                      id: "03295f76-2685-4b5f-815f-30c17b6e4c48",
                      name: "TS. Trần Thị Bình",
                      image: null,
                      website: "https://example.com/tran-thi-binh",
                      isActive: true,
                      position: "Giảng viên chính",
                      workUnit: "Khoa Công nghệ Thông tin",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "TS",
                    },
                  ],
                },
                {
                  id: "1761226903292-v6x00b0ju",
                  name: "Đau khổ tâm lý (Psychological distress)",
                  lecturers: [
                    {
                      id: "c30e0326-3ea6-4b7c-a6d2-b3e9ad3b8e65",
                      name: "GS.TS. Hoàng Văn Em",
                      image: null,
                      website: "https://example.com/hoang-van-em",
                      isActive: true,
                      position: "Giáo sư",
                      workUnit: "Khoa Khoa học Máy tính",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "GS",
                    },
                  ],
                },
                {
                  id: "1761226912023-q6m1np5li",
                  name: "Trầm cảm (Depression)",
                  lecturers: [
                    {
                      id: "depression-lecturer-1",
                      name: "PGS.TS. Nguyễn Văn An",
                      image: null,
                      website: "https://example.com/nguyen-van-an-depression",
                      isActive: true,
                      position: "Phó Trưởng khoa",
                      workUnit: "Khoa Tâm lý học",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "PGS",
                    },
                    {
                      id: "depression-lecturer-2",
                      name: "TS. Lê Văn Cường",
                      image: null,
                      website: "https://example.com/le-van-cuong",
                      isActive: true,
                      position: "Giảng viên chính",
                      workUnit: "Khoa Tâm lý học",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "TS",
                    },
                  ],
                },
                {
                  id: "1761226934377-e0i80rde9",
                  name: "Trầm cảm ở người chăm sóc (Caregivers' depression)",
                  lecturers: [
                    {
                      id: "caregiver-lecturer-1",
                      name: "TS. Lê Văn Cường",
                      image: null,
                      website: "https://example.com/le-van-cuong-caregiver",
                      isActive: true,
                      position: "Giảng viên chính",
                      workUnit: "Khoa Tâm lý học",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "TS",
                    },
                    {
                      id: "caregiver-lecturer-2",
                      name: "GS.TS. Hoàng Văn Em",
                      image: null,
                      website: "https://example.com/hoang-van-em-caregiver",
                      isActive: true,
                      position: "Giáo sư",
                      workUnit: "Khoa Tâm lý học",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "GS",
                    },
                  ],
                },
              ],
            },
            {
              id: "1761226846352-g8yde1ejk",
              name: "Chiến lược ứng phó và khả năng phục hồi tâm lý",
              fields: [
                {
                  id: "coping-strategy-field-1",
                  name: "Kỹ năng ứng phó với stress",
                  lecturers: [
                    {
                      id: "coping-lecturer-1",
                      name: "PGS.TS. Phạm Thị Lan",
                      image: null,
                      website: "https://example.com/pham-thi-lan",
                      isActive: true,
                      position: "Phó Trưởng khoa",
                      workUnit: "Khoa Tâm lý học",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "PGS",
                    },
                    {
                      id: "coping-lecturer-2",
                      name: "TS. Vũ Văn Minh",
                      image: null,
                      website: "https://example.com/vu-van-minh",
                      isActive: true,
                      position: "Giảng viên",
                      workUnit: "Khoa Tâm lý học",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "TS",
                    },
                  ],
                },
                {
                  id: "resilience-field-1",
                  name: "Khả năng phục hồi tâm lý",
                  lecturers: [
                    {
                      id: "resilience-lecturer-1",
                      name: "GS.TS. Nguyễn Thị Hoa",
                      image: null,
                      website: "https://example.com/nguyen-thi-hoa",
                      isActive: true,
                      position: "Giáo sư",
                      workUnit: "Khoa Tâm lý học",
                      createdAt: "2025-10-22T16:51:15.867Z",
                      updatedAt: "2025-10-22T16:51:15.867Z",
                      academicTitle: "GS",
                    },
                  ],
                },
              ],
            },
          ],
          description: "Sức khoẻ tầm thần và cảm xúc cá nhân",
        },
      ],
    },
    createdAt: "2025-10-23T13:42:40.423Z",
    updatedAt: "2025-10-23T13:57:29.450Z",
  },
  message: "Success",
  statusCode: 200,
  timestamp: "2025-10-23T17:48:33.359Z",
}

export default function TreePage() {
  const searchParams = useSearchParams()
  const major = searchParams.get("major") || "Tâm lý học"
  const [data, setData] = useState(mockData.data.value_jsonb)
  const [loading, setLoading] = useState(false)

  // Simulate API call based on major
  useEffect(() => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      // For now, use the same data for both majors
      // In real implementation, you would fetch different data based on major
      setData(mockData.data.value_jsonb)
      setLoading(false)
    }, 1000)
  }, [major])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/res" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <BiArrowBack className="w-5 h-5" />
              Quay lại
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Cấu trúc chuyên ngành {major}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <TreeView data={data} />
        )}
      </div>
    </div>
  )
}
