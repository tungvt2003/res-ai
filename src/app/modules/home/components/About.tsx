import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="py-4 px-6 md:px-12">
        <div className="flex justify-between gap-20">
          <div>
            <div className="mb-6 relative">
              {/* Who We Are? */}
              <span
                className="relative inline-block text-8xl font-jost font-extrabold text-transparent"
                style={{
                  background: "-webkit-linear-gradient(0deg, #f4e5da, #def4f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Chúng Tôi Là Ai?
              </span>

              {/* H2 nằm trên */}
              <h2 className="absolute -bottom-10 left-0 text-3xl font-semibold text-gray-800">
                Chẩn đoán mắt bằng AI để phát hiện sớm và chăm sóc thị lực
              </h2>
            </div>
            <p className="mt-15 text-gray-700 text-justify">
              DeepEyeX là hệ thống chẩn đoán bệnh về mắt được hỗ trợ bởi AI, giúp bạn phát hiện sớm các tình trạng về
              mắt, đảm bảo chăm sóc thị lực chính xác, cá nhân hóa và toàn diện. Với độ chính xác lên đến 94%, bạn có
              thể tin tưởng công nghệ của chúng tôi để bảo vệ đôi mắt và kiểm soát sức khỏe mắt của mình.
            </p>
          </div>
          <div className="relative inline-block flex-shrink-0">
            <Image
              src="https://23july.hostlin.com/optcare/wp-content/uploads/2022/05/about-1.png"
              alt="About Us"
              width={500}
              height={500}
              className="relative"
            />
            <div className="absolute left-0 bottom-0 p-4 bg-[#f17732] rounded-lg flex items-center space-x-2 w-60 gap-5">
              <h2 className="text-lg font-bold text-white">10,000+</h2>
              <h4 className="text-sm text-white">Mắt được chẩn đoán với độ chính xác AI</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
