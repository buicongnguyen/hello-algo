# Thuật ngữ Hello Algo tiếng Việt

Phiên bản: `v0.1-pilot`

Nguồn chuẩn: bản tiếng Anh tại commit upstream `4935d2d3877a6205008d89def8d2ba43f7e06275`

Từ điển này quy định cách gọi ưu tiên trong bản dịch. Khi một thuật ngữ xuất hiện lần đầu trong một chương, có thể ghi từ tiếng Anh trong ngoặc nếu điều đó giúp người học tra cứu. Những lần sau chỉ dùng cách gọi tiếng Việt đã thống nhất.

## Thuật ngữ cốt lõi

| English | Tiếng Việt ưu tiên | Ghi chú |
| --- | --- | --- |
| algorithm | thuật toán | Không dùng “giải thuật” trong cùng một chương |
| data | dữ liệu | datum hiếm khi cần dịch riêng |
| data structure | cấu trúc dữ liệu | DSA → cấu trúc dữ liệu và thuật toán |
| input / output | đầu vào / đầu ra | Giữ tên biến trong mã nguồn |
| instruction | chỉ dẫn | operation → thao tác |
| correctness | tính đúng đắn | correct solution → lời giải đúng |
| efficiency | hiệu quả | Phân biệt với correctness |
| trade-off | sự đánh đổi | Có thể giải thích bằng “được mặt này, mất mặt kia” |

## Cấu trúc dữ liệu

| English | Tiếng Việt ưu tiên | Ghi chú |
| --- | --- | --- |
| array | mảng | index → chỉ mục |
| linked list | danh sách liên kết | node → nút |
| stack | ngăn xếp | LIFO → vào sau, ra trước |
| queue | hàng đợi | FIFO → vào trước, ra trước |
| hash table | bảng băm | hash function → hàm băm |
| collision | xung đột băm | “va chạm” chỉ dùng khi giải thích đời thường |
| tree | cây | root → nút gốc; leaf → nút lá |
| binary tree | cây nhị phân | child → nút con |
| heap | đống | Phân biệt với vùng nhớ heap theo ngữ cảnh |
| graph | đồ thị | vertex → đỉnh; edge → cạnh |
| adjacency | kề | adjacency list → danh sách kề |
| traversal | phép duyệt | Dùng “duyệt” như động từ |

## Thuật toán và kỹ thuật

| English | Tiếng Việt ưu tiên | Ghi chú |
| --- | --- | --- |
| binary search | tìm kiếm nhị phân | search space → không gian tìm kiếm |
| insertion sort | sắp xếp chèn | ordered section → phần đã sắp xếp |
| radix sort | sắp xếp cơ số | digit → chữ số |
| divide and conquer | chia để trị | Giữ cách viết này trong toàn dự án |
| recursion | đệ quy | base case → trường hợp cơ sở |
| iteration | phép lặp | loop → vòng lặp |
| backtracking | quay lui | pruning → cắt tỉa |
| dynamic programming | quy hoạch động | Có thể dùng DP sau lần giải thích đầu |
| greedy algorithm | thuật toán tham lam | local optimum → tối ưu cục bộ |
| sorting stability | tính ổn định của sắp xếp | stable sort → thuật toán sắp xếp ổn định |

## Phân tích độ phức tạp

| English | Tiếng Việt ưu tiên | Ghi chú |
| --- | --- | --- |
| complexity analysis | phân tích độ phức tạp | asymptotic complexity analysis → phân tích độ phức tạp tiệm cận |
| time complexity | độ phức tạp thời gian | Giữ ký hiệu Big-O nguyên dạng |
| space complexity | độ phức tạp không gian | space efficiency → hiệu quả không gian |
| input size | kích thước đầu vào | Có thể dùng “quy mô dữ liệu đầu vào” khi tự nhiên hơn |
| growth trend | xu hướng tăng trưởng | Không đổi thành một giá trị thời gian cụ thể |
| constant | hằng số | constant time → thời gian hằng số |
| logarithmic | logarit | logarithmic time → thời gian logarit |
| linear | tuyến tính | linear time → thời gian tuyến tính |
| quadratic | bậc hai | quadratic time → thời gian bậc hai |
| exponential | hàm mũ | exponential time → thời gian hàm mũ |
| factorial | giai thừa | factorial time → thời gian giai thừa |
| worst case | trường hợp xấu nhất | best case → trường hợp tốt nhất |
| average case | trường hợp trung bình | Không đồng nhất với expected nếu ngữ cảnh xác suất khác |

## Quy tắc thay đổi

1. Một pull request chỉ thay thuật ngữ khi nêu lý do, ví dụ và phạm vi ảnh hưởng.
2. Thay đổi đã chấp nhận phải cập nhật tất cả tài liệu đã phát hành có liên quan.
3. Tên API, từ khóa, định danh, tên lớp và tên hàm trong code fence không được dịch.
4. Nếu chưa thống nhất, ghi câu hỏi trong pull request; không tự tạo nhiều biến thể trong bản phát hành.
