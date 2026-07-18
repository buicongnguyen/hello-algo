# Nhìn lại các thuật toán tìm kiếm

Thuật toán tìm kiếm có thể chia thành hai nhóm: duyệt trực tiếp cấu trúc dữ liệu hoặc tận dụng cách dữ liệu được tổ chức.

## Tìm kiếm vét cạn

Tìm kiếm tuyến tính, BFS và DFS không yêu cầu tiền xử lý và có tính tổng quát cao, nhưng thường tốn $O(n)$.

## Tìm kiếm thích nghi

- Tìm kiếm nhị phân tận dụng mảng có thứ tự: $O(\log n)$.
- Tìm kiếm băm dùng bảng băm: trung bình $O(1)$.
- Tìm kiếm cây dùng BST cân bằng: $O(\log n)$.

Các phương pháp này cần tiền xử lý hoặc cấu trúc bổ sung và phải trả chi phí duy trì khi dữ liệu thay đổi.

![So sánh các chiến lược tìm kiếm](searching_algorithm_revisited.assets/searching_algorithms.png)

## Chọn phương pháp

- Chỉ truy vấn một lần hoặc dữ liệu nhỏ: tìm kiếm tuyến tính.
- Mảng lớn, ít thay đổi và đã sắp xếp: tìm kiếm nhị phân.
- Truy vấn chính xác với yêu cầu tốc độ cao: bảng băm.
- Cần thứ tự, truy vấn phạm vi và cập nhật: cây tìm kiếm cân bằng.
