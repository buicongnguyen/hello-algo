# Tóm tắt Chương 6

### Ôn tập trọng tâm

- Bảng băm lưu cặp khóa–giá trị và dùng hàm băm để chọn bucket.
- Thêm, xóa và tìm kiếm có chi phí trung bình $O(1)$ nhưng có thể suy giảm đến $O(n)$ khi xung đột nghiêm trọng.
- Hệ số tải bằng số phần tử chia cho sức chứa; hệ số cao thường làm tăng xung đột.
- Mở rộng yêu cầu cấp phát bảng lớn hơn và băm lại mọi khóa.
- Nối chuỗi riêng giữ nhiều phần tử trong mỗi bucket; địa chỉ mở dò vị trí khác trong cùng mảng.
- Dò tuyến tính đơn giản nhưng tạo cụm; dò bậc hai và băm nhiều lần thay đổi chuỗi dò.
- Hàm băm tốt cần xác định, nhanh và phân bố đều. Hàm băm mật mã còn cần chống đảo ngược và xung đột có chủ đích.
- Khóa bằng nhau phải có cùng mã băm; khóa nên bất biến khi nằm trong bảng.
- Hàm băm dùng cho bảng dữ liệu không thay thế thuật toán băm mật khẩu chuyên dụng.

### Hỏi và đáp

**Xung đột có nghĩa là hàm băm bị lỗi không?**

Không. Khi miền khóa lớn hơn số kết quả, xung đột là tất yếu. Điều quan trọng là phân bố đều và xử lý xung đột đúng.

**Vì sao phải băm lại khi tăng sức chứa?**

Chỉ mục thường phụ thuộc vào `capacity`. Khi sức chứa thay đổi, cùng mã băm có thể ánh xạ đến bucket khác.

**Có thể dùng `hash()` của Python để kiểm tra toàn vẹn tệp không?**

Không nên. Giá trị có thể thay đổi giữa các tiến trình và không có thuộc tính mật mã cần thiết. Hãy dùng SHA-256 hoặc thuật toán phù hợp từ thư viện chuẩn.

**Vì sao khóa có thể thay đổi gây lỗi tra cứu?**

Nếu trường tham gia tính mã băm thay đổi, mã mới dẫn đến bucket khác trong khi đối tượng vẫn nằm ở vị trí cũ.
