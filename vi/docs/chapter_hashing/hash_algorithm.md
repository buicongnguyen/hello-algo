# Thuật toán băm

Thuật toán băm ánh xạ đầu vào có độ dài tùy ý thành một giá trị có độ dài cố định hoặc hữu hạn. Vì miền đầu vào lớn hơn miền đầu ra, nhiều đầu vào chắc chắn có thể cho cùng kết quả.

![Trường hợp phân bố băm tốt và xấu](hash_algorithm.assets/hash_collision_best_worst_condition.png)

## Mục tiêu của thuật toán băm

Tùy mục đích, một hàm băm tốt cần nhiều thuộc tính.

- **Tính xác định**: cùng đầu vào luôn cho cùng đầu ra trong cùng quy ước.
- **Phân bố đều**: khóa được trải tương đối đều trên các bucket.
- **Hiệu quả**: tính nhanh hơn chi phí thao tác mà nó hỗ trợ.
- **Hiệu ứng thác lũ**: thay đổi nhỏ ở đầu vào làm nhiều bit đầu ra thay đổi.
- **Khó đảo ngược và khó tạo xung đột có chủ đích** đối với hàm băm mật mã.

Hàm băm cho bảng tra cứu không nhất thiết phù hợp để lưu mật khẩu. Mật khẩu cần thuật toán chuyên dụng chậm, có salt và chống tấn công dò hàng loạt như Argon2, scrypt hoặc bcrypt.

## Thiết kế thuật toán băm

Các kỹ thuật cơ bản thường kết hợp:

- cộng hoặc nhân với hằng số để trộn vị trí ký tự;
- phép XOR và dịch bit để khuếch tán thay đổi;
- số nguyên tố hoặc modulo để giảm mẫu lặp;
- xử lý từng byte theo thứ tự xác định.

Ví dụ giáo dục đơn giản sau không dùng cho bảo mật:

```python
def simple_hash(text: str, capacity: int) -> int:
    value = 0
    for byte in text.encode("utf-8"):
        value = (value * 31 + byte) % capacity
    return value
```

Python ngẫu nhiên hóa `hash()` của một số kiểu giữa các tiến trình để giảm tấn công xung đột. Vì vậy không nên lưu giá trị `hash()` tích hợp vào tệp rồi mong nó ổn định giữa các lần chạy.

## Các thuật toán băm phổ biến

- MD5 và SHA-1 có vai trò lịch sử nhưng không còn an toàn trước xung đột trong ứng dụng mật mã.
- SHA-2 và SHA-3 là các họ hàm băm mật mã hiện đại cho kiểm tra toàn vẹn và nhiều giao thức.
- MurmurHash, xxHash và những hàm không mật mã khác ưu tiên tốc độ và phân bố cho bảng băm, phân vùng hoặc xử lý dữ liệu.

Chọn thuật toán theo mô hình đe dọa và yêu cầu tương thích, không chỉ theo tốc độ.

## Giá trị băm trong cấu trúc dữ liệu

Khóa dùng trong bảng băm phải có quan hệ nhất quán giữa bằng nhau và băm:

$$
a = b \Rightarrow hash(a) = hash(b)
$$

Chiều ngược lại không đúng vì hai khóa khác nhau có thể xung đột. Khóa cũng nên bất biến trong thời gian nằm trong bảng; nếu nội dung quyết định mã băm thay đổi, hệ thống có thể không tìm lại được khóa ở bucket cũ.

Các đối tượng phức tạp thường kết hợp mã băm của từng trường. Chỉ dùng các trường tham gia phép so sánh bằng nhau và giữ thứ tự kết hợp ổn định.
