import Image from "next/image"
import { BiMailSend, BiMap, BiPhone, BiUser } from "react-icons/bi"

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#202c45] py-[70px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white/50 px-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-white text-lg font-bold">Thông tin liên hệ</h2>
            <div className="flex flex-col gap-2">
              <a href="https://share.google/xuVxYQkpy10ZUVqU0" className="flex items-center gap-2 text-sm">
                <BiMap className="w-4 h-4 text-white" />
                <span>34 Lê Lợi, Phú Hội, Huế, Thành phố Huế</span>
              </a>
              <a href="tel:+84909090909" className="flex items-center gap-2 text-sm">
                <BiPhone className="w-4 h-4 text-white" /> <span>+84905303024</span>
              </a>
              <p className="flex items-center gap-2 text-sm">
                <BiUser className="w-4 h-4 text-white" /> TEAM RES-AI.EDU
              </p>
              <a href="mailto:daihochue@husc.edu.vn" className="flex items-center gap-2 text-sm">
                <BiMailSend className="w-4 h-4 text-white" /> <span>infor.res.ai.edu@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="flex flex-row gap-[140px] pr-[150px]">
            <div className="flex flex-col items-center gap-2">
              <Image src="/Logo_DHSPHue.PNG" alt="Logo" width={100} height={100} />
              <h2 className="text-white text-lg font-bold">Đại học Sư Phạm Huế</h2>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image src="/Logo_Đại_học_Huế.svg.png" alt="Logo" width={100} height={100} />
              <h2 className="text-white text-lg font-bold">Đại học Huế </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black/80 py-2.5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[#666666]">
          <p>&copy; Bản quyền thuộc về RES-AI.EDU 2025.</p>
        </div>
      </div>
    </footer>
  )
}
