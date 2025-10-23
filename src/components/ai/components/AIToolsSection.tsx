import Image from "next/image"
import Link from "next/link"
import { BiBookOpen, BiLinkExternal, BiSearch } from "react-icons/bi"

export default function AIToolsSection() {
  const aiTools = [
    {
      name: "SciSpace (Typeset)",
      description: "Trợ lý nghiên cứu AI hỗ trợ viết học thuật",
      logo: "/SciSpace.jpg",
      url: "https://typeset.io",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Research Rabbit",
      description: "Công cụ AI khám phá và tổ chức tài liệu nghiên cứu",
      logo: "/rabbit.png",
      url: "https://researchrabbit.ai",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Google Scholar",
      description: "Công cụ tìm kiếm học thuật cho tài liệu khoa học",
      logo: "/Google_Scholar_logo.png",
      url: "https://scholar.google.com",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Elicit",
      description: "Trợ lý AI hỗ trợ tổng quan tài liệu nghiên cứu",
      logo: "/elicit.jpeg",
      url: "https://elicit.org",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Litmaps",
      description: "Công cụ mapping và khám phá tài liệu trực quan",
      logo: "/litmaps.png",
      url: "https://litmaps.com",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Page Digest",
      description: "Công cụ AI tóm tắt tài liệu tự động",
      logo: "/pd-circle-min-min.png",
      url: "https://pagedigest.com",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Connected Papers",
      description: "Công cụ trực quan khám phá tài liệu học thuật",
      logo: "/connected-papers-icon.png",
      url: "https://connectedpapers.com",
      color: "from-teal-500 to-teal-600",
    },
  ]

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#202c45] mb-4">Công Cụ AI & Tìm Kiếm Học Thuật</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các công cụ AI tiên tiến và nguồn tài liệu học thuật để hỗ trợ nghiên cứu của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aiTools.map((tool, index) => (
            <Link
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image src={tool.logo} alt={tool.name} width={48} height={48} />
                  </div>
                  <BiLinkExternal className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>

                <h3 className="font-semibold text-lg text-[#202c45] mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>

                <div className="mt-4 flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700">
                  <BiSearch className="w-4 h-4 mr-1" />
                  Truy cập ngay
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-r from-[#202c45] to-[#2E8BC0] rounded-2xl p-8 text-white">
          <div className="text-center">
            <BiBookOpen className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-4">Tài Nguyên Học Thuật</h3>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Khám phá các công cụ AI mạnh mẽ để tìm kiếm, phân tích và tổ chức tài liệu học thuật. Từ việc tìm kiếm
              nghiên cứu đến tóm tắt tài liệu, các công cụ này sẽ giúp bạn tiết kiệm thời gian và nâng cao chất lượng
              nghiên cứu.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
