# EventHub - Lập trình di động 2

Ứng dụng khám phá và đăng ký sự kiện được xây dựng bằng React Native + Expo.

## Chạy project

```bash
npm install
npx expo start
```

Sau đó:
- Nhấn `a` để chạy Android Emulator.
- Quét QR bằng Expo Go trên điện thoại.
- Nhấn `w` để chạy web.

## Tài khoản demo
Không cần backend. Bạn có thể nhập email/mật khẩu bất kỳ để đăng nhập; đăng ký cũng được lưu cục bộ bằng AsyncStorage.

## Chức năng
- Đăng ký / đăng nhập
- Home + danh mục
- Tìm kiếm sự kiện
- Chi tiết sự kiện
- Yêu thích
- Đăng ký vé
- Vé của tôi
- Hồ sơ và đăng xuất
- Lưu dữ liệu cục bộ

## Hướng phát triển cho bài lớn
Có thể tích hợp Firebase Authentication + Firestore, Firebase Storage, thông báo push và thanh toán.
app by tranhoang