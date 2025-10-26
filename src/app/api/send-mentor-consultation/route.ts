import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Mapping values to labels
    const universityLabels = {
      "dhsp-hue": "Trường ĐHSP Huế",
      "hue-member": "Trường thành viên khác ĐH Huế",
      "outside-hue": "Ngoài ĐH Huế",
    }

    const majorLabels = {
      education: "Giáo dục học",
      psychology: "Tâm lý học",
      literature: "Ngữ văn",
      "natural-science": "Khoa học tự nhiên",
      "tech-education": "Công nghệ giáo dục",
      other: "Khác",
    }

    const yearLabels = {
      year1: "Năm 1",
      year2: "Năm 2",
      year3: "Năm 3",
      year4: "Năm 4",
      master: "Học viên cao học",
      alumni: "Cựu sinh viên",
      "high-school": "Học sinh THPT",
    }

    const durationLabels = {
      "1-session": "1 buổi cố vấn trực tuyến",
      "1-month": "1 tháng đồng hành",
      "3-month": "3 tháng mentoring học kỳ",
    }

    const mentorTypeLabels = {
      lecturer: "Giảng viên trong trường",
      alumni: "Cựu sinh viên có công bố",
      researcher: "Nhà nghiên cứu ngoài trường",
      any: "Không quan trọng, chỉ cần đúng lĩnh vực",
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "infor.res.ai.edu@gmail.com",
      subject: "Đăng ký cố vấn học thuật - RES-AI.EDU",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #f8f9fa; }
            .header { background: #202c45; color: white; padding: 25px; text-align: center; }
            .content { background: white; padding: 30px; }
            .info-row { display: flex; margin-bottom: 15px; padding: 12px 0; border-bottom: 1px solid #eee; }
            .info-label { font-weight: bold; color: #202c45; width: 180px; flex-shrink: 0; }
            .info-value { color: #555; flex: 1; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
            .section-title { color: #202c45; font-size: 18px; font-weight: bold; margin: 25px 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #202c45; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; font-size: 24px;">ĐĂNG KÝ CỐ VẤN HỌC THUẬT</h2>
              <p style="margin: 8px 0 0 0; opacity: 0.9;">RES-AI.EDU</p>
            </div>
            
            <div class="content">
              <div class="section-title">Thông tin cá nhân</div>
              
              <div class="info-row">
                <div class="info-label">Họ và tên:</div>
                <div class="info-value">${formData.fullName}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">${formData.email}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Số điện thoại:</div>
                <div class="info-value">${formData.phone}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Trường:</div>
                <div class="info-value">${universityLabels[formData.university as keyof typeof universityLabels] || formData.university}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Ngành học:</div>
                <div class="info-value">${majorLabels[formData.major as keyof typeof majorLabels] || formData.major}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Cấp độ:</div>
                <div class="info-value">${yearLabels[formData.year as keyof typeof yearLabels] || formData.year}</div>
              </div>
              
              <div class="section-title">Nhu cầu cố vấn</div>
              
              <div class="info-row">
                <div class="info-label">Giai đoạn hỗ trợ:</div>
                <div class="info-value">${formData.researchStage.join(", ")}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Mục tiêu:</div>
                <div class="info-value">${formData.goal}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Thời lượng:</div>
                <div class="info-value">${durationLabels[formData.duration as keyof typeof durationLabels] || formData.duration}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Loại mentor:</div>
                <div class="info-value">${mentorTypeLabels[formData.mentorType as keyof typeof mentorTypeLabels] || formData.mentorType}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Hình thức:</div>
                <div class="info-value">${formData.format.join(", ")}</div>
              </div>
              
              ${
                formData.hasIdea === "yes" && formData.researchIdea
                  ? `
              <div class="info-row">
                <div class="info-label">Ý tưởng nghiên cứu:</div>
                <div class="info-value">${formData.researchIdea}</div>
              </div>
              `
                  : ""
              }
              
              ${
                formData.portfolio
                  ? `
              <div class="info-row">
                <div class="info-label">Portfolio:</div>
                <div class="info-value"><a href="${formData.portfolio}" style="color: #202c45;">${formData.portfolio}</a></div>
              </div>
              `
                  : ""
              }
            </div>
            
            <div class="footer">
              <p><strong>Ngày gửi:</strong> ${new Date().toLocaleString("vi-VN")}</p>
              <p><strong>Vui lòng liên hệ sinh viên trong vòng 3 ngày làm việc</strong></p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
              <p><strong>RES-AI.EDU</strong> - Kết nối tri thức, lan tỏa văn hóa nghiên cứu</p>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
