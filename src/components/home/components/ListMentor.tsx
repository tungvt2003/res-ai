import MentorCarouselPlain from "@/components/home/components/MentorCarousel"
import { useGetMentors } from "@/components/mentor/hooks/use-mentor.mutation"
import Loading from "@/components/shares/components/Loading"

export default function ListMentor() {
  const { data: mentorsResponse, isLoading, error } = useGetMentors()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu mentor</p>
      </div>
    )
  }

  const mentors = mentorsResponse?.data || []

  return (
    <section id="listmentor" aria-labelledby="listmentor-heading" className="relative bg-white">
      <div className="w-full">
        <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-10 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                  Gặp gỡ đội ngũ
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-slate-700 to-gray-700">
                    chuyên gia hàng đầu
                  </span>
                </h2>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed">
                Kết nối với các giáo sư, tiến sĩ và chuyên gia có kinh nghiệm sâu rộng trong lĩnh vực nghiên cứu và AI.
                Họ sẽ đồng hành cùng bạn trong hành trình học tập và phát triển.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                  <span>Hướng dẫn cá nhân hóa</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>Kinh nghiệm thực tế</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-lg">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-600">AI</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Trí tuệ nhân tạo</span>
                      </div>
                      <span className="text-sm text-slate-500">15+ mentor</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-600">CS</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Khoa học máy tính</span>
                      </div>
                      <span className="text-sm text-slate-500">12+ mentor</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-600">DS</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Khoa học dữ liệu</span>
                      </div>
                      <span className="text-sm text-slate-500">10+ mentor</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-600">ED</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Giáo dục & Đào tạo</span>
                      </div>
                      <span className="text-sm text-slate-500">13+ mentor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Carousel */}
        <div className="pb-16">
          <MentorCarouselPlain data={mentors} pxPerSecond={50} />
        </div>
      </div>
    </section>
  )
}
