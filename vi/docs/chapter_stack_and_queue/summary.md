# Tóm tắt Chương 5

### Ôn tập trọng tâm

- Ngăn xếp tuân theo LIFO; hàng đợi tuân theo FIFO; deque cho phép thao tác ở cả hai đầu.
- `push`, `pop`, `peek` và kiểm tra kích thước của ngăn xếp đều nên tốn $O(1)$.
- Hàng đợi cần thêm ở cuối và xóa ở đầu trong $O(1)$; danh sách liên kết hai đầu hoặc mảng vòng đáp ứng yêu cầu này.
- Deque có thể mô phỏng cả ngăn xếp lẫn hàng đợi.
- Mảng động có tính cục bộ bộ nhớ đệm tốt nhưng đôi lúc phải mở rộng; danh sách liên kết linh hoạt nhưng cần thêm tham chiếu.
- Ngăn xếp thường xuất hiện trong đệ quy, hoàn tác, phân tích biểu thức, DFS và quay lui.
- Hàng đợi thường dùng trong BFS, lập lịch, bộ đệm và xử lý yêu cầu.
- Deque hữu ích cho cửa sổ trượt, BFS 0–1 và các bài toán cần thao tác ở hai đầu.

### Hỏi và đáp

**Vì sao không dùng đầu mảng làm đỉnh ngăn xếp?**

Thêm hoặc xóa ở đầu mảng thường phải dịch các phần tử còn lại và tốn $O(n)$. Dùng cuối mảng tránh việc dịch này.

**Hàng đợi dựa trên mảng có cần dịch phần tử sau mỗi lần xóa không?**

Không. Mảng vòng chỉ tăng chỉ mục đầu và dùng modulo để tái sử dụng các ô trống.

**Deque có thay thế hoàn toàn ngăn xếp và hàng đợi không?**

Về chức năng có thể, nhưng dùng giao diện hẹp hơn giúp diễn đạt ý định rõ ràng và ngăn những thao tác không hợp lệ với thuật toán.
