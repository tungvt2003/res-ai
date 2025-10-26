"use client"

import { motion } from "framer-motion"
import { BadgeCheck, Check, ChevronRight, Info, Sparkles, Star, Upload } from "lucide-react"
import { useMemo, useState } from "react"

// Simple Progress Ring component (pure SVG)
const ProgressRing = ({ value }: { value: number }) => {
  const radius = 36
  const stroke = 8
  const normalizedRadius = radius - stroke * 0.5
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (value / 100) * circumference
  return (
    <svg height={radius * 2} width={radius * 2} className="overflow-visible">
      <circle
        strokeOpacity={0.15}
        strokeWidth={stroke}
        stroke="currentColor"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        strokeWidth={stroke}
        strokeLinecap="round"
        stroke="currentColor"
        className="text-blue-500"
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm font-semibold fill-current"
        style={{ fontSize: "12px" }}
      >
        {value}%
      </text>
    </svg>
  )
}

// Badge level definitions
const LEVELS = [
  {
    key: "foundational",
    title: "Cấp độ 1: Nhận thức nền tảng",
    subtitle: "Foundational",
    color: "from-blue-500 to-indigo-500",
    icon: <Info className="h-5 w-5" />,
    goals: [
      "Hiểu khái niệm NCKH và vai trò trong đào tạo đại học",
      "Nắm các bước cơ bản của quy trình nghiên cứu",
      "Tìm tài liệu học thuật sơ cấp (Google Scholar, thư viện số)",
      "Làm quen trích dẫn, tránh đạo văn, dùng công cụ kiểm tra AI",
    ],
  },
  {
    key: "applied",
    title: "Cấp độ 2: Ứng dụng thực hành",
    subtitle: "Applied",
    color: "from-emerald-500 to-teal-500",
    icon: <BadgeCheck className="h-5 w-5" />,
    goals: [
      "Xác lập câu hỏi/nghiên cứu vấn đề cụ thể",
      "Thiết kế đề cương cơ bản (mục tiêu – phương pháp – công cụ)",
      "Thu thập & xử lý dữ liệu định tính/định lượng cơ bản",
      "Viết báo cáo/bài viết học thuật nội bộ",
      "Dùng AI hỗ trợ tìm tài liệu, viết nháp, tóm tắt dữ liệu",
    ],
  },
  {
    key: "advanced",
    title: "Cấp độ 3: Độc lập & Công bố",
    subtitle: "Advanced",
    color: "from-fuchsia-500 to-rose-500",
    icon: <Sparkles className="h-5 w-5" />,
    goals: [
      "Viết bài báo hoàn chỉnh (IMRaD)",
      "Sử dụng thành thạo công cụ AI hỗ trợ học thuật",
      "Hiểu quy trình xuất bản & phản biện học thuật",
      "Có sản phẩm công bố tại hội thảo/tạp chí uy tín",
    ],
  },
] as const

type LevelKey = (typeof LEVELS)[number]["key"]

type Evidence = {
  id: string
  title: string
  url?: string
  status: "pending" | "approved" | "rejected"
  comment?: string
}

type LevelProgress = {
  completed: boolean[]
  evidence: Evidence[]
  mentorNote?: string
}

type Profile = Record<LevelKey, LevelProgress> & {
  name: string
  mentor: string
}

const initialProfile: Profile = {
  name: "Sinh viên Nguyễn Văn A",
  mentor: "GV. Trần Thị B",
  foundational: {
    completed: [true, true, false, false],
    evidence: [],
    mentorNote: "Tiếp tục rèn luyện trích dẫn APA.",
  },
  applied: {
    completed: [false, false, false, false, false],
    evidence: [],
    mentorNote: undefined,
  },
  advanced: {
    completed: [false, false, false, false],
    evidence: [],
    mentorNote: undefined,
  },
}

const ResearchLiteracyBadge = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [active, setActive] = useState<LevelKey>("foundational")

  const activeDef = useMemo(() => LEVELS.find(l => l.key === active)!, [active])
  const progressPct = useMemo(() => {
    const arr = profile[active].completed
    return Math.round((arr.filter(Boolean).length / arr.length) * 100)
  }, [profile, active])

  const toggleTask = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      [active]: {
        ...prev[active],
        completed: prev[active].completed.map((v, i) => (i === idx ? !v : v)),
      },
    }))
  }

  const addEvidence = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const ev: Evidence = {
        id: Math.random().toString(36).slice(2),
        title: file.name,
        url: URL.createObjectURL(file),
        status: "pending",
      }
      setProfile(prev => ({
        ...prev,
        [active]: { ...prev[active], evidence: [...prev[active].evidence, ev] },
      }))
    }
    input.click()
  }

  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white text-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Research Literacy Badge</h1>
            <p className="text-base text-slate-600 mt-2">
              Hồ sơ: <span className="font-medium">{profile.name}</span> • Mentor:{" "}
              <span className="font-medium">{profile.mentor}</span>
            </p>
          </div>
          {/* <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-3"
          >
            <User className="h-5 w-5" />
            <MessageSquare className="h-5 w-5" />
          </motion.div> */}
        </div>

        {/* Level Selector */}
        <div className="grid md:grid-cols-3 gap-4">
          {LEVELS.map(lvl => {
            const pct = Math.round((profile[lvl.key].completed.filter(Boolean).length / lvl.goals.length) * 100)
            const activeCls = active === lvl.key ? "ring-2 ring-slate-900" : "border-2 border-transparent"
            return (
              <motion.button
                key={lvl.key}
                onClick={() => setActive(lvl.key)}
                whileHover={{ y: -2 }}
                className={`group relative w-full text-left p-5 rounded-2xl bg-white shadow-sm transition overflow-hidden ${activeCls}`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${lvl.color}`} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-slate-100 text-slate-700">{lvl.icon}</span>
                    <div>
                      <div className="font-medium">{lvl.title}</div>
                      <div className="text-xs text-slate-500">{lvl.subtitle}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="w-16 h-16 text-blue-500">
                      <ProgressRing value={pct} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <Star className="h-4 w-4" />
                  <span>
                    {profile[lvl.key].completed.filter(Boolean).length}/{lvl.goals.length} tiêu chí
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Active Level Detail */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{activeDef.title}</h2>
                  <p className="text-sm text-slate-600 mt-1">Mục tiêu & tiêu chí hoàn thành</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 text-blue-500">
                    <ProgressRing value={progressPct} />
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {activeDef.goals.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => toggleTask(i)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border transition text-left ${
                      profile[active].completed[i]
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                        profile[active].completed[i] ? "bg-emerald-500 text-white border-emerald-500" : "bg-white"
                      }`}
                    >
                      {profile[active].completed[i] && <Check className="h-3 w-3" />}
                    </span>
                    <span className="text-sm leading-snug">{g}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Minh chứng (Evidence)</h3>
                  <p className="text-sm text-slate-600 mt-1">Tải lên báo cáo, link Google Drive, DOI bài viết…</p>
                </div>
                <button
                  onClick={addEvidence}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800"
                >
                  <Upload className="h-4 w-4" /> Tải minh chứng
                </button>
              </div>
              <div className="space-y-2">
                {profile[active].evidence.length === 0 ? (
                  <p className="text-sm text-slate-500">Chưa có minh chứng. Hãy tải lên sản phẩm học thuật của bạn.</p>
                ) : (
                  profile[active].evidence.map(ev => (
                    <div key={ev.id} className="flex items-center justify-between p-3 rounded-xl border bg-slate-50">
                      <div className="text-sm">
                        <div className="font-medium">{ev.title}</div>
                        <div className="text-xs text-slate-500">
                          Trạng thái:
                          {ev.status === "pending"
                            ? " Chờ duyệt mentor"
                            : ev.status === "approved"
                              ? " Đã duyệt"
                              : " Từ chối"}
                        </div>
                      </div>
                      <button className="text-slate-500 text-xs inline-flex items-center gap-1 hover:text-slate-700">
                        Xem <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Ghi chú của Mentor</h3>
              <p className="text-sm text-slate-600 min-h-16">
                {profile[active].mentorNote || "Mentor chưa để lại nhận xét. Hãy gửi minh chứng để nhận phản hồi."}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Gợi ý AI (Study Coach)</h3>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                <li>Dùng Google Scholar + &quot;site:.edu&quot; để lọc tài liệu học thuật chất lượng.</li>
                <li>Thử Elicit/Scite để trích xuất bằng chứng từ bài báo nhanh chóng.</li>
                <li>Viết nháp với ChatGPT, chuẩn hóa ngôn ngữ bằng Grammarly, kiểm tra đạo văn trước khi nộp.</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Điều kiện nhận Badge</h3>
              <p className="text-sm text-slate-600">
                Hoàn thành 100% tiêu chí + ít nhất 1 minh chứng được mentor duyệt.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResearchLiteracyBadge
