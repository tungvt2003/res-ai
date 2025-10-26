# Hướng dẫn cấu hình Email API

## Bước 1: Tạo App Password cho Gmail

1. Truy cập https://myaccount.google.com/
2. Vào mục **Security** > **2-Step Verification** (bật nếu chưa bật)
3. Vào mục **App passwords** trong Security
4. Chọn app là **Mail** và device là **Other (Custom name)**
5. Nhập tên: "RES-AI.EDU"
6. Copy App Password được tạo (16 ký tự, không có khoảng trắng)

## Bước 2: Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc của project:

```env
EMAIL_USER=vancongthanhdata10@gmail.com
EMAIL_PASSWORD=your-16-digit-app-password-here
```

## Bước 3: Cách sử dụng

Khi người dùng submit form "Liên hệ Mentor học thuật", hệ thống sẽ:

1. Gửi email tự động đến địa chỉ `vancongthanhdata10@gmail.com`
2. Email sẽ chứa toàn bộ thông tin form của người dùng
3. Format email HTML đẹp mắt với thông tin đầy đủ

## Lưu ý

- App Password là khác với mật khẩu Google thông thường
- Không chia sẻ App Password trong code hoặc public repository
- File `.env.local` sẽ được gitignore tự động

