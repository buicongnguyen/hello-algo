# Tóm tắt Chương 10

### Ôn tập trọng tâm

- Tìm kiếm nhị phân dựa vào dữ liệu có thứ tự và liên tục giảm một nửa khoảng tìm kiếm. Thuật toán cần đầu vào đã sắp xếp và phù hợp với mảng hoặc cấu trúc hỗ trợ truy cập ngẫu nhiên.
- Tìm kiếm vét cạn định vị dữ liệu bằng cách duyệt cấu trúc. Tìm tuyến tính áp dụng cho mảng, danh sách liên kết; BFS và DFS áp dụng cho cây, đồ thị. Chúng tổng quát, không cần tiền xử lý nhưng thường có độ phức tạp $O(n)$.
- Tra cứu băm, tìm trên cây và tìm kiếm nhị phân tận dụng cấu trúc dữ liệu để nhanh chóng định vị mục tiêu. Chúng có thể đạt $O(\log n)$ hoặc trung bình $O(1)$, nhưng cần dữ liệu được tổ chức trước hoặc cần cấu trúc phụ.
- Khi chọn phương pháp, phải xét quy mô dữ liệu, số lần truy vấn, yêu cầu độ trễ, tần suất cập nhật, nhu cầu giữ thứ tự, truy vấn khoảng và giới hạn bộ nhớ.
- Tìm tuyến tính thích hợp cho dữ liệu nhỏ, chỉ tìm một lần hoặc cập nhật thường xuyên. Tìm nhị phân phù hợp với dữ liệu lớn, tĩnh, đã sắp xếp. Tra cứu băm phù hợp khi cần truy vấn khóa rất nhanh mà không cần thứ tự. Tìm trên cây phù hợp với tập dữ liệu động vẫn phải giữ thứ tự và hỗ trợ khoảng.
- Thay tìm tuyến tính lặp lại bằng bảng băm là chiến lược tối ưu phổ biến: một lần tra cứu có thể giảm từ $O(n)$ xuống trung bình $O(1)$ bằng cách dùng thêm không gian.

Điểm chèn, biên trái và biên phải là các biến thể của cùng một bất biến tìm kiếm nhị phân. Thay vì chỉ hỏi “mục tiêu có tồn tại không”, thuật toán xác định ranh giới đầu tiên thỏa hoặc không thỏa một điều kiện đơn điệu. Việc mô tả rõ ý nghĩa của hai con trỏ sau mỗi vòng giúp tránh lỗi lệch một đơn vị.

Không nên chỉ nhìn độ phức tạp truy vấn. Nếu chỉ tìm một lần, chi phí sắp xếp hoặc dựng bảng có thể không được bù lại. Nếu truy vấn nhiều lần trên dữ liệu ít thay đổi, tiền xử lý tạo ra lợi ích lớn. Lựa chọn đúng là lựa chọn tối ưu cho toàn bộ vòng đời dữ liệu.
