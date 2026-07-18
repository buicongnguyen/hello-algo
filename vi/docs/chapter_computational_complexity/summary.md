# Tóm tắt Chương 2

### Ôn tập trọng tâm

**Đánh giá hiệu quả thuật toán**

- Hiệu quả thời gian và hiệu quả không gian là hai tiêu chí chính để đánh giá hiệu năng thuật toán.
- Đo thực nghiệm chịu ảnh hưởng của môi trường chạy và có thể tốn nhiều tài nguyên.
- Phân tích độ phức tạp khắc phục phần lớn hạn chế đó, áp dụng được trên nhiều nền tảng và cho thấy hiệu quả khi quy mô dữ liệu thay đổi.

**Độ phức tạp thời gian**

- Độ phức tạp thời gian đo xu hướng tăng của thời gian chạy khi lượng dữ liệu tăng.
- Trường hợp xấu nhất dùng ký hiệu Big $O$, tương ứng với cận trên tiệm cận của số phép toán $T(n)$ khi $n$ tiến tới vô hạn.
- Việc suy ra độ phức tạp gồm hai bước: đếm số phép toán, sau đó xác định hạng tăng nhanh nhất.
- Các dạng thường gặp theo thứ tự tăng dần là $O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$, $O(2^n)$ và $O(n!)$.
- Hiệu quả của một số thuật toán phụ thuộc vào phân bố đầu vào, nên có trường hợp xấu nhất, tốt nhất và trung bình.
- Trường hợp trung bình gần với hoạt động thực tế nhưng thường khó tính vì phải phân tích phân bố đầu vào và kỳ vọng toán học.

**Độ phức tạp không gian**

- Độ phức tạp không gian đo xu hướng tăng của lượng bộ nhớ thuật toán sử dụng.
- Bộ nhớ liên quan gồm không gian đầu vào, tạm thời và đầu ra. Khi phân tích, chúng ta thường không tính đầu vào; không gian tạm thời gồm dữ liệu tạm, khung ngăn xếp và lệnh chương trình.
- Thông thường chúng ta quan tâm tới không gian trong trường hợp xấu nhất và tại đỉnh sử dụng bộ nhớ.
- Các dạng không gian phổ biến là $O(1)$, $O(\log n)$, $O(n)$, $O(n^2)$ và $O(2^n)$.

### Hỏi và đáp

**Đệ quy đuôi có độ phức tạp không gian $O(1)$ không?**

Về lý thuyết, đệ quy đuôi có thể được tối ưu xuống $O(1)$. Tuy nhiên, nhiều ngôn ngữ như Java, Python, C++, Go và C# không tự động tối ưu đệ quy đuôi, nên thông thường vẫn xem độ phức tạp không gian là $O(n)$.

**Hàm và phương thức khác nhau thế nào?**

Một **hàm** có thể chạy độc lập và nhận tham số tường minh. Một **phương thức** gắn với một đối tượng hoặc lớp, được liên kết với đối tượng gọi nó và có thể thao tác trên dữ liệu của đối tượng.

- C là ngôn ngữ thủ tục nên chủ yếu có hàm, dù có thể mô phỏng hướng đối tượng bằng cấu trúc.
- Java và C# tổ chức mã trong lớp; phương thức tĩnh gần với hàm vì gắn với lớp thay vì một thực thể cụ thể.
- C++ và Python hỗ trợ cả lập trình thủ tục lẫn hướng đối tượng.

**Đồ thị các dạng độ phức tạp không gian có biểu diễn lượng bộ nhớ tuyệt đối không?**

Không. Đồ thị biểu diễn xu hướng tăng, không phải số byte tuyệt đối. Khi $n$ nhỏ, hằng số ẩn có thể chi phối; khi $n$ rất lớn, xu hướng tăng mới trở thành yếu tố quyết định.

**Có khi nào nên đánh đổi thời gian hoặc không gian không?**

Có. Chỉ mục cơ sở dữ liệu dùng thêm bộ nhớ cho cây B+ hoặc bảng băm để truy vấn nhanh hơn. Ngược lại, thiết bị nhúng có ít bộ nhớ có thể dùng tìm kiếm tuần tự thay cho bảng băm, chấp nhận chạy chậm hơn để tiết kiệm không gian.
