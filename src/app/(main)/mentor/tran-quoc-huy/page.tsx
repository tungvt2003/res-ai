"use client"

import Image from "next/image"
import { useState } from "react"

const MentorDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <main className="grow my-28 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar trái - Ảnh và thông tin */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <div className="text-center">
                  {/* Ảnh */}
                  <div className="rounded-lg flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Image
                      src="/uploads/2025/10/tranquochuy-1761496658524.png"
                      alt="TRẦN NGỌC HUY"
                      width={192}
                      height={192}
                      className="object-cover"
                    />
                  </div>

                  {/* Tên và chức danh */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">TRẦN NGỌC HUY</h2>
                  <p className="text-red-600 font-semibold text-lg mb-2">Chuyên gia đào tạo Ứng dụng AI</p>
                  <p className="text-sm text-gray-600 mb-6">Kỹ sư, Cử nhân</p>

                  {/* Stats
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-3xl font-bold text-red-600">15</p>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Bài báo</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-3xl font-bold text-red-600">3</p>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Sách - GT</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-3xl font-bold text-red-600">5</p>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Đề tài KH</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-3xl font-bold text-red-600">2</p>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Công trình</p>
                    </div>
                  </div> */}

                  {/* Thông tin liên hệ */}
                  <div className="space-y-3 text-left">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-red-600 mb-3 border-b-2 border-red-600 pb-1">Thông tin</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong className="text-gray-700">Giới tính:</strong>{" "}
                          <span className="text-gray-600">Nam</span>
                        </p>
                        <p>
                          <strong className="text-gray-700">Ngày sinh:</strong>{" "}
                          <span className="text-gray-600">10/11/1985</span>
                        </p>
                        <p>
                          <strong className="text-gray-700">Nơi sinh:</strong>{" "}
                          <span className="text-gray-600">Quảng Trị</span>
                        </p>
                        <p>
                          <strong className="text-gray-700">Địa chỉ:</strong>{" "}
                          <span className="text-gray-600">Long Hưng, Hải Phú, Hải Lăng, Quảng Trị</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-red-600 mb-3 border-b-2 border-red-600 pb-1">Liên hệ</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong className="text-gray-700">Điện thoại:</strong>{" "}
                          <span className="text-gray-600">0913.978.587</span>
                        </p>
                        <p>
                          <strong className="text-gray-700">Email:</strong>{" "}
                          <span className="text-gray-600">ngochuyit@gmail.com</span>
                        </p>
                        <p>
                          <strong className="text-gray-700">Messenger:</strong>{" "}
                          <a
                            href="http://m.me/ngochuyit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            m.me/ngochuyit
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nội dung chính */}
            <div className="lg:col-span-2 space-y-6">
              {/* Lý lịch sơ lược */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-red-600 pb-2">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  LÝ LỊCH SƠ LƯỢC
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                      <p className="font-semibold text-gray-900">TRẦN NGỌC HUY</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Giới tính</p>
                      <p className="font-semibold text-gray-900">Nam</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Ngày, tháng, năm sinh</p>
                      <p className="font-semibold text-gray-900">10/11/1985</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Nơi sinh</p>
                      <p className="font-semibold text-gray-900">Quảng Trị</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Học vị cao nhất</p>
                      <p className="font-semibold text-gray-900">Kỹ sư, Cử nhân</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-base font-semibold text-gray-600 mb-2">Chức vụ hiện tại:</p>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>• Chuyên gia đào tạo Ứng dụng AI trong học tập, dạy học và nghiên cứu khoa học.</p>
                      <p>• Phó GĐ Công ty TNHH Thu Nghĩa.</p>
                      <p>• Giám đốc Hệ thống Giáo dục NewSky.</p>
                      <p>• Trưởng Ban đào tạo Cộng đồng Doanh nghiệp OBC Stars.</p>
                      <p>• Đồng Trưởng Cộng đồng Học sinh - Sinh viên Sáng tạo Quốc gia.</p>
                      <p>
                        • Đồng Trưởng Ban thư ký Cộng đồng Sáng chế và Doanh nghiệp Đổi mới Sáng tạo - TechFest Quốc
                        gia.
                      </p>
                      <p>• Mentor Cộng đồng Sinh viên phát triển kỹ năng TP. Đà Nẵng (BBE)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quá trình đào tạo */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-red-600 pb-2">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  QUÁ TRÌNH ĐÀO TẠO
                </h2>

                {/* Bảng quá trình đào tạo */}
                {/* <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-red-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Bậc đào tạo</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Chuyên môn/Ngành đào tạo</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Cơ sở đào tạo</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900 font-medium">Đại học</td>
                        <td className="py-3 px-4 text-gray-900">Kỹ sư CNTT - Cử nhân QTKD - Cử nhân NNA</td>
                        <td className="py-3 px-4 text-gray-600">Trường Đại học Sư phạm Huế</td>
                        <td className="py-3 px-4 text-gray-600">2008</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900 font-medium">Sau đại học</td>
                        <td className="py-3 px-4 text-gray-900">Quản lý giáo dục</td>
                        <td className="py-3 px-4 text-gray-600">Trường Đại học Sư phạm Huế</td>
                        <td className="py-3 px-4 text-gray-600">Đang học</td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}

                {/* Chứng chỉ khác */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Chứng chỉ khác:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-purple-50">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">STT</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Tên chứng chỉ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">01</td>
                          <td className="py-3 px-4 text-gray-900">
                            CC Nghiệp vụ Sư phạm cho Giảng viên Đại học, Cao đẳng
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-4 text-gray-600">02</td>
                          <td className="py-3 px-4 text-gray-900">CC Nghiệp vụ Tư vấn Tâm lý học đường</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-gray-600">03</td>
                          <td className="py-3 px-4 text-gray-900">Chứng nhận Giảng viên Giảng dạy Kỹ năng sống</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Trình độ Lý luận chính trị:</p>
                  <p className="text-gray-700">Trung cấp Lý luận chính trị - Hành chính.</p>
                </div>
              </div>

              {/* Quá trình nghiên cứu khoa học */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-red-600 pb-2">
                  <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  QUÁ TRÌNH NGHIÊN CỨU KHOA HỌC
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-50">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">TT</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Tên đề tài nghiên cứu</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Năm bắt đầu/Năm hoàn thành</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Đề tài cấp</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Trách nhiệm trong đề tài</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-600">01</td>
                        <td className="py-3 px-4 text-gray-900">
                          Đề án Bồi dưỡng ứng dụng trí tuệ nhân tạo (AI) để tăng cường hiệu quả giảng dạy
                        </td>
                        <td className="py-3 px-4 text-gray-600">2024</td>
                        <td className="py-3 px-4 text-gray-600">Trường Quản lý Cán bộ giáo dục TP. HCM</td>
                        <td className="py-3 px-4 text-gray-600">Tham gia xây dựng nội dung và Giảng dạy</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-600">02</td>
                        <td className="py-3 px-4 text-gray-900">
                          Đề án Quản lý hoạt động ứng dụng trí tuệ nhân tạo trong dạy học ở trường trung học phổ thông
                          Quảng Trị, tỉnh Quảng Trị
                        </td>
                        <td className="py-3 px-4 text-gray-600">2025 - 2026</td>
                        <td className="py-3 px-4 text-gray-600">Trường Đại học Sư phạm Huế</td>
                        <td className="py-3 px-4 text-gray-600">Thực hiện Đề án tốt nghiệp Thạc sĩ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Gallery ảnh */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-red-600 pb-2">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  HÌNH ẢNH HOẠT ĐỘNG
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => handleImageClick("/anh1.jpg")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleImageClick("/anh1.jpg")
                      }
                    }}
                    aria-label="Xem ảnh hoạt động 1"
                  >
                    <Image
                      src="/anh1.jpg"
                      alt="Hoạt động 1"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => handleImageClick("/anh2.jpg")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleImageClick("/anh2.jpg")
                      }
                    }}
                    aria-label="Xem ảnh hoạt động 2"
                  >
                    <Image
                      src="/anh2.jpg"
                      alt="Hoạt động 2"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => handleImageClick("/anh3.jpg")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleImageClick("/anh3.jpg")
                      }
                    }}
                    aria-label="Xem ảnh hoạt động 3"
                  >
                    <Image
                      src="/anh3.jpg"
                      alt="Hoạt động 3"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => handleImageClick("/anh4.jpg")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleImageClick("/anh4.jpg")
                      }
                    }}
                    aria-label="Xem ảnh hoạt động 4"
                  >
                    <Image
                      src="/anh4.jpg"
                      alt="Hoạt động 4"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300 md:col-span-2"
                    onClick={() => handleImageClick("/anh5.jpg")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleImageClick("/anh5.jpg")
                      }
                    }}
                    aria-label="Xem ảnh hoạt động 5"
                  >
                    <Image
                      src="/anh5.jpg"
                      alt="Hoạt động 5"
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Đóng ảnh"
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Ảnh phóng to"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              priority
            />
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Đóng ảnh"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorDetailPage
