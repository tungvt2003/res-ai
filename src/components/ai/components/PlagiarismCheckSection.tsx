import Image from "next/image"
import Link from "next/link"
import {
  BiBookAlt,
  BiCheckCircle,
  BiEditAlt,
  BiFlag,
  BiGlobe,
  BiLinkExternal,
  BiSearchAlt,
  BiShield,
} from "react-icons/bi"

export default function PlagiarismCheckSection() {
  const plagiarismTools = [
    {
      name: "Turnitin",
      description: "Công cụ check đạo văn hàng đầu trong học thuật và giáo dục",
      icon: BiBookAlt,
      url: "https://www.turnitin.com",
      color: "from-red-500 to-red-600",
      type: "Học thuật",
      logo: "/turnitin.png",
    },
    {
      name: "Grammarly",
      description: "Kiểm tra ngữ pháp và phát hiện đạo văn toàn diện",
      icon: BiEditAlt,
      url: "https://www.grammarly.com/plagiarism-checker",
      color: "from-green-500 to-green-600",
      type: "Đa năng",
      logo: "/grammarly.png",
    },
    {
      name: "Plagiarism Detector",
      description: "Công cụ miễn phí kiểm tra đạo văn nhanh chóng",
      icon: BiSearchAlt,
      url: "https://plagiarismdetector.net/vi",
      color: "from-blue-500 to-blue-600",
      type: "Miễn phí",
      logo: "/plagiarism-detector.png",
    },
    {
      name: "Small SEO Tools",
      description: "Bộ công cụ SEO bao gồm kiểm tra đạo văn miễn phí",
      icon: BiGlobe,
      url: "https://smallseotools.com/plagiarism-checker/",
      color: "from-purple-500 to-purple-600",
      type: "Miễn phí",
      logo: "/small-seo.png",
    },
    {
      name: "CopyScape",
      description: "Kiểm tra nội dung đã đăng trên web và phát hiện sao chép",
      icon: BiGlobe,
      url: "https://www.copyscape.com/",
      color: "from-orange-500 to-orange-600",
      type: "Web Content",
      logo: "/copyscape.svg",
    },
    {
      name: "DoIT",
      description: "Công cụ check đạo văn của Việt Nam, phù hợp với tiếng Việt",
      icon: BiFlag,
      url: "http://doit.uet.vnu.edu.vn/",
      color: "from-indigo-500 to-indigo-600",
      type: "Việt Nam",
      logo: "/doIT.png",
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#202c45] mb-4">Các Công Cụ Check Đạo Văn</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sử dụng các công cụ uy tín để kiểm tra tính độc đáo và tránh đạo văn trong bài viết của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plagiarismTools.map((tool, index) => (
            <Link
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm overflow-hidden`}>
                    <Image src={tool.logo || ""} alt={tool.name} width={48} height={48} className="object-cover" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
                      {tool.type}
                    </span>
                    <BiLinkExternal className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-[#202c45] mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">{tool.description}</p>

                <div className="flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700">
                  <BiCheckCircle className="w-4 h-4 mr-1" />
                  Kiểm tra ngay
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white">
          <div className="text-center">
            <BiShield className="w-12 h-12 mx-auto mb-4 text-red-200" />
            <h3 className="text-2xl font-bold mb-4">Tầm Quan Trọng Của Việc Check Đạo Văn</h3>
            <p className="text-lg text-red-100 max-w-3xl mx-auto">
              Việc kiểm tra đạo văn không chỉ giúp đảm bảo tính độc đáo của bài viết mà còn bảo vệ danh tiếng học thuật
              và tránh các vấn đề pháp lý. Sử dụng các công cụ check đạo văn uy tín để đảm bảo chất lượng và tính chính
              trực trong nghiên cứu của bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
