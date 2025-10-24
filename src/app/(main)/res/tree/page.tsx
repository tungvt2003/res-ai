"use client"
import TreeView from "@/components/modules/res/components/TreeView"
import { useSettingsByKey } from "@/components/modules/res/hooks/use-settings.mutation"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BiArrowBack } from "react-icons/bi"

export default function TreePage() {
  const searchParams = useSearchParams()
  const major = searchParams.get("major") || "tam-ly-hoc"

  const { data: settingsData, isLoading, error } = useSettingsByKey(major)

  const treeData = settingsData?.data?.value_jsonb?.parents

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
            <h1 className="text-2xl font-bold text-gray-900">
              Cấu trúc chuyên ngành {settingsData?.data?.name || major}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
            <p className="text-gray-600 mb-4">Không thể tải dữ liệu cho chuyên ngành &quot;{major}&quot;</p>
            <Link
              href="/res"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <BiArrowBack className="w-4 h-4" />
              Quay lại trang chủ
            </Link>
          </div>
        ) : (
          <TreeView parents={treeData ?? []} />
        )}
      </div>
    </div>
  )
}
