# Thuật toán sắp xếp

Thuật toán sắp xếp thường được đánh giá theo độ phức tạp thời gian, không gian, tính ổn định, khả năng sắp xếp tại chỗ và mức thích nghi với dữ liệu gần có thứ tự.

![Ví dụ sắp xếp](sorting_algorithm.assets/sorting_examples.png)

## Các tiêu chí quan trọng

- **Ổn định**: phần tử có khóa bằng nhau giữ nguyên thứ tự tương đối.
- **Tại chỗ**: chỉ dùng $O(1)$ hoặc rất ít bộ nhớ phụ.
- **Thích nghi**: chạy nhanh hơn khi dữ liệu đã gần được sắp xếp.
- **Dựa trên so sánh**: thứ tự được quyết định bằng phép so sánh hai phần tử.

Không có thuật toán tốt nhất cho mọi tình huống. Cần cân bằng kích thước đầu vào, giới hạn bộ nhớ, phân bố khóa và yêu cầu ổn định.
