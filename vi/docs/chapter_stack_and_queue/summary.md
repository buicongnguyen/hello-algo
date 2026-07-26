# Tóm tắt Chương 5

### Ôn tập trọng tâm

- Ngăn xếp là cấu trúc dữ liệu tuân theo nguyên tắc LIFO và có thể được cài đặt bằng mảng hoặc danh sách liên kết.
- Xét về hiệu suất thời gian, cài đặt ngăn xếp bằng mảng có hiệu suất trung bình cao hơn, nhưng khi mở rộng mảng, độ phức tạp của một lần thêm có thể suy giảm thành $O(n)$. Cài đặt bằng danh sách liên kết có hiệu suất ổn định hơn.
- Xét về hiệu suất không gian, mảng có thể để lãng phí một phần sức chứa chưa dùng. Tuy nhiên, mỗi nút danh sách liên kết lại chiếm nhiều bộ nhớ hơn một phần tử mảng vì phải lưu thêm liên kết.
- Hàng đợi tuân theo nguyên tắc FIFO và cũng có thể cài đặt bằng mảng hoặc danh sách liên kết. Kết luận so sánh hiệu suất thời gian và không gian tương tự ngăn xếp.
- Deque là hàng đợi linh hoạt hơn, cho phép thêm và loại bỏ phần tử ở cả hai đầu.

### Hỏi và đáp

**Hỏi**: Chức năng tiến và lùi của trình duyệt có được cài đặt bằng danh sách liên kết đôi không?

Hành vi tiến và lùi của trình duyệt về bản chất là một ứng dụng của “ngăn xếp”. Khi người dùng truy cập trang mới, trang đó được đưa lên đỉnh; khi nhấn nút lùi, trang gần nhất được lấy khỏi đỉnh. Deque có thể hỗ trợ thuận tiện một số thao tác bổ sung, như đã trình bày trong phần “Hàng đợi hai đầu”.

**Hỏi**: Sau khi lấy một nút khỏi ngăn xếp, chúng ta có cần giải phóng bộ nhớ của nút đó không?

Nếu nút vẫn được dùng về sau thì chưa cần giải phóng. Nếu không còn dùng, Java và Python có cơ chế thu gom rác tự động nên không cần giải phóng thủ công; với C và C++, lập trình viên phải tự giải phóng bộ nhớ.

**Hỏi**: Deque trông giống hai ngăn xếp ghép lại. Nó dùng để làm gì?

Deque có thể được xem như sự kết hợp giữa ngăn xếp và hàng đợi, hoặc như hai ngăn xếp ghép lại. Nó kết hợp logic của cả hai nên hỗ trợ mọi ứng dụng của ngăn xếp và hàng đợi, đồng thời linh hoạt hơn.

**Hỏi**: Chức năng hoàn tác và làm lại được cài đặt cụ thể như thế nào?

Dùng hai ngăn xếp: ngăn xếp `A` cho hoàn tác và ngăn xếp `B` cho làm lại.

1. Mỗi khi người dùng thực hiện thao tác, đưa thao tác đó vào `A` và xóa toàn bộ `B`.
2. Khi người dùng “hoàn tác”, lấy thao tác gần nhất khỏi `A` và đưa nó vào `B`.
3. Khi người dùng “làm lại”, lấy thao tác gần nhất khỏi `B` và đưa nó trở lại `A`.
