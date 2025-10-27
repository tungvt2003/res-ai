"use client"

import { useState } from "react"
import {
  BiBook,
  BiBookOpen,
  BiBuilding,
  BiCheckCircle,
  BiLink,
  BiMailSend,
  BiPaperPlane,
  BiPhone,
  BiTargetLock,
  BiTime,
  BiUser,
  BiX,
  BiXCircle,
} from "react-icons/bi"

const MentorConsultationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    year: "",
    researchStage: [],
    goal: "",
    duration: "",
    format: [],
    hasIdea: "",
    researchIdea: "",
    mentorType: "",
    portfolio: "",
    file: null as File | null,
    agreeTerms: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalType, setModalType] = useState<"success" | "error">("success")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => {
      const currentArray = (prev[name as keyof typeof prev] as string[]) || []
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item: string) => item !== value)
        : [...currentArray, value]
      return {
        ...prev,
        [name]: newArray,
      }
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        file: e.target.files?.[0] || null,
      }))
    }
  }

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      agreeTerms: e.target.checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/send-mentor-consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setModalMessage("Cảm ơn bạn đã đăng ký! Nhóm RES-AI.EDU sẽ liên hệ bạn trong vòng 3 ngày làm việc.")
        setModalType("success")
        setShowModal(true)
        setCurrentStep(1)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          university: "",
          major: "",
          year: "",
          researchStage: [],
          goal: "",
          duration: "",
          format: [],
          hasIdea: "",
          researchIdea: "",
          mentorType: "",
          portfolio: "",
          file: null,
          agreeTerms: false,
        })
      } else {
        setModalMessage("Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.")
        setModalType("error")
        setShowModal(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setModalMessage("Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.")
      setModalType("error")
      setShowModal(true)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-0 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#202c45] mb-4">Liên Hệ Tư vấn Từ Đội ngũ Mentor</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            Một ý tưởng nhỏ – Một mentor đồng hành – Một hành trình học thuật bắt đầu
          </p>
          <p className="text-sm text-gray-500">Kết nối tri thức, lan tỏa văn hóa nghiên cứu cùng RES-AI.EDU</p>

          {/* Steps indicator */}
          <div className="flex items-center justify-center mt-8 gap-2">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step ? "bg-[#202c45] text-white" : "bg-gray-200 text-gray-600"
                  } transition-all duration-300`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 ${currentStep > step ? "bg-[#202c45]" : "bg-gray-200"} transition-all duration-300`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#202c45] mb-6 flex items-center gap-2">
                  <BiUser className="w-6 h-6" />
                  Thông tin cá nhân
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <BiUser className="w-4 h-4" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                      placeholder="Họ tên đầy đủ"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <BiMailSend className="w-4 h-4" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <BiPhone className="w-4 h-4" />
                      Số điện thoại/Zalo *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                      placeholder="0912345678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <BiBuilding className="w-4 h-4" />
                      Trường/Đơn vị học tập *
                    </label>
                    <select
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                    >
                      <option value="">Chọn trường</option>
                      <option value="dhsp-hue">Trường ĐHSP Huế</option>
                      <option value="hue-member">Trường thành viên khác ĐH Huế</option>
                      <option value="outside-hue">Ngoài ĐH Huế</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <BiBook className="w-4 h-4" />
                      Ngành học / Lĩnh vực quan tâm *
                    </label>
                    <select
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                    >
                      <option value="">Chọn ngành</option>
                      <option value="education">Giáo dục học</option>
                      <option value="psychology">Tâm lý học</option>
                      <option value="literature">Ngữ văn</option>
                      <option value="natural-science">Khoa học tự nhiên</option>
                      <option value="tech-education">Công nghệ giáo dục</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <BiBookOpen className="w-4 h-4" />
                      Năm học / Cấp độ *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                    >
                      <option value="">Chọn cấp độ</option>
                      <option value="year1">Năm 1</option>
                      <option value="year2">Năm 2</option>
                      <option value="year3">Năm 3</option>
                      <option value="year4">Năm 4</option>
                      <option value="master">Học viên cao học</option>
                      <option value="alumni">Cựu sinh viên</option>
                      <option value="high-school">Học sinh THPT</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#202c45] text-white rounded-lg font-semibold hover:bg-[#2a3a5c] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Tiếp theo →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Research Needs */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#202c45] mb-6 flex items-center gap-2">
                  <BiTargetLock className="w-6 h-6" />
                  Nhu cầu cố vấn
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Bạn cần hỗ trợ ở giai đoạn nào trong quá trình nghiên cứu? *
                  </label>
                  <div className="space-y-2">
                    {[
                      "Hình thành ý tưởng",
                      "Viết đề cương",
                      "Thu thập & xử lý dữ liệu",
                      "Viết bài báo/luận văn",
                      "Xuất bản/công bố khoa học",
                    ].map((stage, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="researchStage"
                          value={stage}
                          checked={formData.researchStage.includes(stage as never)}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#202c45] rounded focus:ring-[#202c45]"
                        />
                        <span className="text-gray-700">{stage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mục tiêu của bạn khi tìm mentor là gì? *
                  </label>
                  <textarea
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all resize-none"
                    placeholder="VD: Hoàn thiện đề cương NCKH cấp trường, chuẩn bị công bố, xin học bổng..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <BiTime className="w-4 h-4" />
                      Thời lượng mong muốn *
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                    >
                      <option value="">Chọn thời lượng</option>
                      <option value="1-session">1 buổi cố vấn trực tuyến</option>
                      <option value="1-month">1 tháng đồng hành</option>
                      <option value="3-month">3 tháng mentoring học kỳ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bạn mong muốn được cố vấn bởi *
                    </label>
                    <select
                      name="mentorType"
                      value={formData.mentorType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                    >
                      <option value="">Chọn loại mentor</option>
                      <option value="lecturer">Giảng viên trong trường</option>
                      <option value="alumni">Cựu sinh viên có công bố</option>
                      <option value="researcher">Nhà nghiên cứu ngoài trường</option>
                      <option value="any">Không quan trọng, chỉ cần đúng lĩnh vực</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Hình thức làm việc mong muốn *</label>
                  <div className="flex flex-wrap gap-4">
                    {["Online", "Trực tiếp", "Kết hợp"].map((format, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="format"
                          value={format}
                          checked={formData.format.includes(format as never)}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#202c45] rounded focus:ring-[#202c45]"
                        />
                        <span className="text-gray-700">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bạn có ý tưởng nghiên cứu ban đầu chưa? *
                  </label>
                  <div className="flex gap-6 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasIdea"
                        value="yes"
                        checked={formData.hasIdea === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#202c45]"
                      />
                      <span>Có</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasIdea"
                        value="no"
                        checked={formData.hasIdea === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#202c45]"
                      />
                      <span>Chưa</span>
                    </label>
                  </div>
                  {formData.hasIdea === "yes" && (
                    <textarea
                      name="researchIdea"
                      value={formData.researchIdea}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all resize-none"
                      placeholder="Mô tả ngắn về ý tưởng nghiên cứu (2-3 dòng)"
                    />
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    ← Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#202c45] text-white rounded-lg font-semibold hover:bg-[#2a3a5c] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Tiếp theo →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Submit */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#202c45] mb-6 flex items-center gap-2">
                  <BiLink className="w-6 h-6" />
                  Hoàn tất đăng ký
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <BiLink className="w-4 h-4" />
                    Link Portfolio (Google Drive, Notion, e-Portfolio)
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File minh chứng (tối đa 10MB)</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202c45] focus:border-transparent transition-all"
                  />
                  {formData.file && <p className="mt-2 text-sm text-gray-600">Đã chọn: {formData.file.name}</p>}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleAgreeChange}
                      required
                      className="mt-1 w-4 h-4 text-[#202c45] rounded focus:ring-[#202c45]"
                    />
                    <span className="text-sm text-gray-700">
                      Tôi đồng ý chia sẻ thông tin học thuật của mình cho hệ thống RES-AI.EDU nhằm mục đích ghép mentor
                      phù hợp. *
                    </span>
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    ← Quay lại
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.agreeTerms}
                    className="px-8 py-3 bg-[#202c45] text-white rounded-lg font-semibold hover:bg-[#2a3a5c] transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <BiPaperPlane className="w-5 h-5" />
                    Gửi đăng ký
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  modalType === "success" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {modalType === "success" ? (
                  <BiCheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <BiXCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-2 ${modalType === "success" ? "text-green-600" : "text-red-600"}`}>
                {modalType === "success" ? "Đăng ký thành công!" : "Có lỗi xảy ra"}
              </h3>
              <p className="text-gray-600 leading-relaxed">{modalMessage}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  modalType === "success"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MentorConsultationForm
