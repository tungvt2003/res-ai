"use client"
import { geminiApi } from "@/components/shares/api/chat"
import { useEffect, useRef, useState } from "react"
import { BiBot, BiCheck, BiCopy, BiRefresh, BiSend, BiUser } from "react-icons/bi"
import Markdown from "react-markdown"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatAiPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là Gemini AI, trợ lý nghiên cứu của bạn. Tôi có thể giúp bạn tìm kiếm tài liệu, phân tích dữ liệu, và hỗ trợ các công việc nghiên cứu khoa học. Bạn cần hỗ trợ gì hôm nay?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputText
    setInputText("")
    setIsLoading(true)

    try {
      const reply = await geminiApi.sendMessage(currentInput)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Xin lỗi, đã xảy ra lỗi khi nhận phản hồi. Vui lòng thử lại sau.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)

    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"
  }

  const handleCopyMessage = (messageId: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        text: "Xin chào! Tôi là Gemini AI, trợ lý nghiên cứu của bạn. Tôi có thể giúp bạn tìm kiếm tài liệu, phân tích dữ liệu, và hỗ trợ các công việc nghiên cứu khoa học. Bạn cần hỗ trợ gì hôm nay?",
        isUser: false,
        timestamp: new Date(),
      },
    ])
  }

  // Auto scroll to bottom when new messages arrive (disabled)
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // }, [messages, isLoading])

  // Reset textarea height when input is cleared
  useEffect(() => {
    if (textareaRef.current && !inputText) {
      textareaRef.current.style.height = "48px"
    }
  }, [inputText])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <BiBot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Gemini AI</h1>
              <p className="text-sm text-gray-500">Trợ lý nghiên cứu thông minh</p>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BiRefresh className="w-4 h-4" />
            Cuộc trò chuyện mới
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map(message => (
            <div key={message.id} className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}>
              {!message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <BiBot className="w-5 h-5 text-white" />
                </div>
              )}

              <div className={`max-w-3xl ${message.isUser ? "order-first" : ""}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.isUser ? "bg-blue-600 text-white ml-auto" : "bg-white border border-gray-200"
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {message.isUser ? (
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    ) : (
                      <Markdown>{message.text}</Markdown>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {!message.isUser && (
                    <button
                      onClick={() => handleCopyMessage(message.id, message.text)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {copiedMessageId === message.id ? (
                        <BiCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <BiCopy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {message.isUser && (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <BiUser className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <BiBot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">Gemini đang suy nghĩ...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={handleTextareaChange}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn về nghiên cứu..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                rows={1}
                style={{
                  minHeight: "48px",
                  maxHeight: "120px",
                  height: "48px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db transparent",
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="self-end px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <BiSend className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Nhấn Enter để gửi, Shift + Enter để xuống dòng</p>
        </div>
      </div>
    </div>
  )
}
