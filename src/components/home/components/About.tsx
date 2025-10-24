import Link from "next/link"
import { BiAward, BiBookOpen, BiBrain, BiSearch, BiTrendingUp, BiUserCheck } from "react-icons/bi"

const features = [
  {
    icon: BiSearch,
    title: "RES",
    subtitle: "Research Platform",
    description:
      "Nền tảng nghiên cứu khoa học tích hợp AI, giúp sinh viên và giảng viên khám phá, phân tích và phát triển các dự án nghiên cứu chuyên sâu.",
    link: "/res",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: BiBookOpen,
    title: "EDU",
    subtitle: "Education Hub",
    description:
      "Trung tâm giáo dục kết nối sinh viên với đội ngũ mentor chuyên môn, cung cấp hướng dẫn và hỗ trợ học tập cá nhân hóa.",
    link: "/edu",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: BiBrain,
    title: "AI",
    subtitle: "AI Tools & Ethics",
    description:
      "Bộ công cụ AI và tài nguyên về đạo đức AI, giúp người học sử dụng công nghệ một cách có trách nhiệm và hiệu quả.",
    link: "/ai",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
            <h2 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
                RES-AI.EDU
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-slate-600 leading-relaxed mb-6">
              Nền tảng tích hợp nghiên cứu khoa học, giáo dục và trí tuệ nhân tạo, tạo ra môi trường học tập và nghiên
              cứu tiên tiến cho cộng đồng học thuật.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Nghiên cứu khoa học</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Giáo dục thông minh</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Trí tuệ nhân tạo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Link key={feature.title} href={feature.link} className="group relative">
                <div
                  className={`${feature.bgColor} rounded-3xl p-8 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105 border border-white/50 group-hover:border-white/80 backdrop-blur-sm`}
                >
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${feature.bgColor} group-hover:scale-110 transition-all duration-500 shadow-lg`}
                    >
                      <IconComponent
                        className={`w-10 h-10 ${feature.iconColor} group-hover:rotate-12 transition-transform duration-500`}
                      />
                    </div>

                    {/* Floating decoration */}
                    <div
                      className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r ${feature.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                    ></div>
                    <div
                      className={`absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-gradient-to-r ${feature.color} opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3
                          className={`text-3xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                        >
                          {feature.title}
                        </h3>
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} group-hover:scale-150 transition-transform duration-300`}
                        ></div>
                      </div>
                      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        {feature.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-base group-hover:text-slate-700 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Action indicator */}
                    <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                      <span>Khám phá ngay</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Border gradient effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Thành tựu nổi bật</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Những con số ấn tượng thể hiện sự phát triển và tác động tích cực của nền tảng
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: BiTrendingUp,
                value: "500+",
                label: "Dự án nghiên cứu",
                description: "Được thực hiện thành công",
                color: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
              },
              {
                icon: BiUserCheck,
                value: "50+",
                label: "Mentor chuyên môn",
                description: "Giảng viên giàu kinh nghiệm",
                color: "from-green-500 to-emerald-500",
                bgColor: "bg-green-50",
                iconColor: "text-green-600",
              },
              {
                icon: BiAward,
                value: "1000+",
                label: "Sinh viên tham gia",
                description: "Đang học tập và nghiên cứu",
                color: "from-purple-500 to-pink-500",
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className={`${stat.bgColor} rounded-2xl p-6 text-center group hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/50`}
                >
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                  </div>

                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.value}
                  </div>

                  <div className="text-lg font-semibold text-slate-900 mb-1">{stat.label}</div>

                  <div className="text-sm text-slate-600">{stat.description}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
