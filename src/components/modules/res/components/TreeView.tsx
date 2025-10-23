"use client"
import Image from "next/image"
import { useState } from "react"
import { BiBookOpen, BiChevronDown, BiChevronRight, BiFolder, BiFolderOpen, BiTag, BiUser } from "react-icons/bi"

interface Lecturer {
  id: string
  name: string
  image: string | null
  website: string | null
  isActive: boolean
  position: string
  workUnit: string
  academicTitle: string
}

interface Field {
  id: string
  name: string
  lecturers: Lecturer[]
}

interface Topic {
  id: string
  name: string
  fields: Field[]
}

interface Parent {
  id: string
  name: string
  description: string
  topics: Topic[]
}

interface TreeViewProps {
  data: {
    parents: Parent[]
  }
}

export default function TreeView({ data }: TreeViewProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedField, setSelectedField] = useState<Field | null>(null)

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const handleFieldClick = (field: Field) => {
    setSelectedField(field)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Tree Structure */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BiBookOpen className="w-5 h-5 text-white" />
            </div>
            Cấu trúc chuyên ngành
          </h2>

          <div className="space-y-3">
            {data.parents.map(parent => (
              <div key={parent.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* Parent Level - Level 1 */}
                <div
                  className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-blue-100 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                  onClick={() => toggleExpanded(parent.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {expandedItems.has(parent.id) ? (
                        <BiChevronDown className="w-6 h-6 text-blue-600" />
                      ) : (
                        <BiChevronRight className="w-6 h-6 text-blue-600" />
                      )}
                      <BiFolderOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{parent.name}</h3>
                      <p className="text-sm text-blue-700 mt-1">{parent.description}</p>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 bg-blue-200 px-3 py-1 rounded-full font-medium">
                    {parent.topics.length} chủ đề
                  </div>
                </div>

                {/* Topics Level - Level 2 */}
                {expandedItems.has(parent.id) && (
                  <div className="bg-gray-50">
                    {parent.topics.map((topic, topicIndex) => (
                      <div key={topic.id} className={`${topicIndex > 0 ? "border-t border-gray-200" : ""}`}>
                        <div
                          className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all duration-200 ml-6"
                          onClick={() => toggleExpanded(topic.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {expandedItems.has(topic.id) ? (
                                <BiChevronDown className="w-5 h-5 text-gray-600" />
                              ) : (
                                <BiChevronRight className="w-5 h-5 text-gray-600" />
                              )}
                              <BiFolder className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-semibold text-gray-800">{topic.name}</span>
                          </div>
                          <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                            {topic.fields.length} lĩnh vực
                          </div>
                        </div>

                        {/* Fields Level - Level 3 */}
                        {expandedItems.has(topic.id) && (
                          <div className="bg-white">
                            {topic.fields.map((field, fieldIndex) => (
                              <div
                                key={field.id}
                                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-blue-50 transition-all duration-200 ml-12 border-l-2 border-blue-200 ${
                                  fieldIndex > 0 ? "border-t border-gray-100" : ""
                                } ${selectedField?.id === field.id ? "bg-blue-50 border-l-blue-500" : ""}`}
                                onClick={() => handleFieldClick(field)}
                              >
                                <div className="flex items-center gap-3">
                                  <BiTag className="w-4 h-4 text-blue-600" />
                                  <span className="text-gray-700 font-medium">{field.name}</span>
                                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                                    {field.lecturers.length} giảng viên
                                  </span>
                                </div>
                                {selectedField?.id === field.id && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                            ))}
                            {topic.fields.length === 0 && (
                              <div className="p-4 ml-12 text-gray-500 text-sm italic">Chưa có lĩnh vực nào</div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lecturers Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <BiUser className="w-5 h-5 text-white" />
            </div> */}
            {selectedField ? selectedField.name : "Chọn lĩnh vực"}
          </h2>

          {selectedField ? (
            <div className="space-y-4">
              {selectedField.lecturers.length > 0 ? (
                selectedField.lecturers.map(lecturer => (
                  <div
                    key={lecturer.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-gray-50 to-white"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Image
                          src={lecturer.image || "/avatar-default.png"}
                          alt={lecturer.name}
                          width={56}
                          height={56}
                          className="rounded-xl"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-bold text-gray-900 text-lg">{lecturer.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                            {lecturer.academicTitle}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Chức vụ:</span> {lecturer.position}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">Đơn vị:</span> {lecturer.workUnit}
                          </p>
                          {lecturer.website && (
                            <a
                              href={lecturer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                            >
                              Xem trang cá nhân →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BiUser className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Chưa có giảng viên nào trong lĩnh vực này</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BiBookOpen className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Chọn một lĩnh vực</h3>
              <p className="text-gray-500">Để xem danh sách giảng viên trong lĩnh vực đó</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
