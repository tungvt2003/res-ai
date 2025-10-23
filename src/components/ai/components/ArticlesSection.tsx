import { BiBookOpen, BiSearch } from "react-icons/bi"

export default function ArticlesSection() {
  const articles = [
    {
      id: 1,
      title: "Đạo Đức Sử Dụng AI Trong Nghiên Cứu",
      description:
        "Khám phá các nguyên tắc đạo đức quan trọng khi sử dụng AI trong nghiên cứu khoa học, bao gồm tính minh bạch, công bằng và trách nhiệm trong việc phát triển và triển khai các hệ thống AI.",
      category: "Đạo đức AI",
      readTime: "5 phút đọc",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
      badgeColor: "text-purple-600 bg-purple-100",
      hoverColor: "group-hover:text-purple-600",
      linkColor: "text-purple-600 group-hover:text-purple-700",
    },
    {
      id: 2,
      title: "Liêm Chính Khoa Học Trong Nghiên Cứu",
      description:
        "Tìm hiểu về các tiêu chuẩn liêm chính khoa học khi áp dụng AI trong nghiên cứu, đảm bảo tính khách quan, độ tin cậy và tính có thể tái tạo của kết quả nghiên cứu.",
      category: "Liêm chính khoa học",
      readTime: "7 phút đọc",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "from-blue-100 to-cyan-100",
      iconColor: "text-blue-600",
      badgeColor: "text-blue-600 bg-blue-100",
      hoverColor: "group-hover:text-blue-600",
      linkColor: "text-blue-600 group-hover:text-blue-700",
    },
  ]

  const handleArticleClick = (articleId: number) => {
    // TODO: Implement article navigation
    console.log(`Navigate to article ${articleId}`)
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#202c45] mb-4">Bài Viết Chuyên Môn</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tìm hiểu về đạo đức và liêm chính trong việc sử dụng AI cho nghiên cứu khoa học
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {articles.map(article => (
            <div
              key={article.id}
              // onClick={() => handleArticleClick(article.id)}
              className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${article.gradient}`} />
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${article.iconBg} rounded-lg flex items-center justify-center mr-4`}
                  >
                    <BiBookOpen className={`w-6 h-6 ${article.iconColor}`} />
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold ${article.badgeColor} rounded-full`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold text-[#202c45] mb-3 ${article.hoverColor} transition-colors`}>
                  {article.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4">{article.description}</p>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center text-sm font-medium ${article.linkColor} transition-colors`}>
                    <BiSearch className="w-4 h-4 mr-1" />
                    Đọc thêm
                  </div>
                  <div className="text-xs text-gray-500">{article.readTime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
