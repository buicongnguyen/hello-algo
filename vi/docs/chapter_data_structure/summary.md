# Tóm tắt Chương 3

### Ôn tập trọng tâm

- Cấu trúc logic mô tả quan hệ giữa các phần tử; cấu trúc vật lý mô tả cách dữ liệu nằm trong bộ nhớ.
- Cấu trúc tuyến tính gồm mảng, danh sách liên kết, ngăn xếp và hàng đợi. Cây, đống và đồ thị là cấu trúc phi tuyến. Bảng băm có thể kết hợp nhiều dạng cấu trúc.
- Mỗi vùng nhớ có địa chỉ riêng; chương trình dùng địa chỉ đó để truy cập dữ liệu.
- Hai cách lưu trữ vật lý cơ bản là không gian liên tục của mảng và không gian phân tán của danh sách liên kết.
- Kiểu dữ liệu cơ bản mô tả loại nội dung, còn cấu trúc dữ liệu mô tả cách tổ chức nội dung.
- Số nguyên có dấu thường dùng bù hai để thống nhất phép cộng số dương và số âm, đồng thời loại bỏ hai biểu diễn của số không.
- `float` IEEE 754 chia bit cho dấu, số mũ và phần trị. Số mũ mở rộng miền giá trị nhưng làm giảm độ chính xác tương đối.
- Unicode cung cấp không gian điểm mã chung; UTF-8, UTF-16 và UTF-32 là các cách mã hóa điểm mã thành byte.
- UTF-8 có độ dài biến đổi, tương thích ASCII và được dùng rộng rãi trong tệp cũng như giao tiếp mạng.

### Hỏi và đáp

**Vì sao bảng băm có thể chứa cả cấu trúc tuyến tính và phi tuyến?**

Nền tảng của bảng băm thường là một mảng. Để xử lý xung đột, mỗi ô có thể trỏ đến danh sách liên kết; khi danh sách quá dài, một số cách triển khai chuyển nó thành cây. Vì vậy bảng băm có thể kết hợp mảng, danh sách liên kết và cây.

**Kiểu `char` luôn dài 1 byte phải không?**

Không. Kích thước phụ thuộc ngôn ngữ và cách biểu diễn ký tự. `char` của C và C++ thường chiếm 1 byte, trong khi một đơn vị mã UTF-16 thường chiếm 2 byte. Một ký tự Unicode còn có thể cần nhiều đơn vị mã.

**Gọi cấu trúc dựa trên mảng là “tĩnh” có mâu thuẫn với thao tác thêm và xóa không?**

Không. Thao tác có thể động nhưng sức chứa của mảng nền vẫn cố định. Khi vượt quá sức chứa, hệ thống phải cấp phát một mảng lớn hơn và sao chép dữ liệu.

**Vì sao đổi từ mã dấu–trị tuyệt đối sang bù hai và đổi ngược đều có thể dùng “đảo bit rồi cộng 1”?**

Với số nhị phân $n$ bit, hai biểu diễn là phần bù của nhau đối với $2^n$. Vì quan hệ phần bù có tính đối xứng, cùng thao tác đảo bit rồi cộng $1$ đưa biểu diễn này về biểu diễn kia. Phép trừ $1$ rồi đảo bit là cách viết tương đương của quá trình đó.
