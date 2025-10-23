import { BiBrain } from "react-icons/bi"

export default function InfoSection() {
  return (
    <div className="mt-16 bg-gradient-to-r from-[#202c45] to-[#2E8BC0] rounded-2xl p-8 text-white">
      <div className="text-center">
        <BiBrain className="w-12 h-12 mx-auto mb-4 text-blue-200" />
        <h3 className="text-2xl font-bold mb-4">Nghiên Cứu Khoa Học Thông Minh</h3>
        <p className="text-lg text-blue-100 max-w-3xl mx-auto">
          Khám phá các công cụ AI mạnh mẽ để hỗ trợ nghiên cứu khoa học. Từ việc tìm kiếm tài liệu đến trò chuyện với
          AI, chúng tôi cung cấp giải pháp toàn diện cho các nhà nghiên cứu.
        </p>
      </div>
    </div>
  )
}
