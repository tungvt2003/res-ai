import Link from "next/link"
import { BiBookOpen, BiBrain, BiSearch } from "react-icons/bi"

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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
              RES-AI.EDU
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            Nền tảng tích hợp nghiên cứu khoa học, giáo dục và trí tuệ nhân tạo, tạo ra môi trường học tập và nghiên cứu
            tiên tiến cho cộng đồng học thuật.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Link key={feature.title} href={feature.link} className="group relative">
                <div
                  className={`${feature.bgColor} rounded-2xl p-8 h-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 border border-white/50`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3
                        className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-2`}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{feature.subtitle}</p>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">500+</div>
            <div className="text-sm text-slate-600">Dự án nghiên cứu</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">50+</div>
            <div className="text-sm text-slate-600">Mentor chuyên môn</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">1000+</div>
            <div className="text-sm text-slate-600">Sinh viên tham gia</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">95%</div>
            <div className="text-sm text-slate-600">Độ chính xác AI</div>
          </div>
        </div>
      </div>
    </section>
  )
}
