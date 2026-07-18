# Xung đột băm

Không gian khóa thường lớn hơn số bucket nên xung đột là không thể tránh hoàn toàn. Hai nhóm giải pháp phổ biến là **nối chuỗi riêng** và **địa chỉ mở**.

## Nối chuỗi riêng

Mỗi bucket giữ một danh sách các cặp khóa–giá trị có cùng chỉ mục băm. Thêm và xóa đơn giản; bảng có thể chứa nhiều phần tử hơn số bucket, nhưng mỗi phần tử cần thêm cấu trúc liên kết và việc truy cập phân tán có thể kém thân thiện với bộ nhớ đệm.

![Bảng băm dùng nối chuỗi riêng](hash_collision.assets/hash_table_chaining.png)

Nếu các chuỗi trở nên dài, một số triển khai chuyển bucket sang cây cân bằng để cải thiện trường hợp xấu.

## Địa chỉ mở

Mọi cặp khóa–giá trị nằm trực tiếp trong mảng bucket. Khi vị trí ban đầu đã dùng, thuật toán dò các vị trí khác theo một quy tắc xác định.

### Dò tuyến tính

Kiểm tra lần lượt vị trí kế tiếp cho đến khi gặp khóa cần tìm hoặc một ô trống. Cách này đơn giản và có tính cục bộ tốt nhưng dễ tạo các cụm phần tử liên tiếp.

![Phân bố khóa khi dò tuyến tính](hash_collision.assets/hash_table_linear_probing.png)

Không thể xóa bằng cách biến ô thành trống ngay lập tức, vì việc tìm khóa phía sau có thể dừng quá sớm. Thường dùng một dấu **đã xóa** đặc biệt, còn gọi là tombstone.

![Vấn đề xóa trong địa chỉ mở](hash_collision.assets/hash_table_open_addressing_deletion.png)

### Dò bậc hai

Thử các độ lệch $1^2, 2^2, 3^2, \ldots$ thay vì đi từng ô. Nó giảm cụm sơ cấp nhưng vẫn có thể khiến các khóa cùng vị trí ban đầu đi theo cùng một chuỗi dò.

### Băm nhiều lần

Dùng hàm băm thứ hai để xác định bước nhảy. Nếu bước nhảy và sức chứa được chọn phù hợp, thuật toán có thể thăm toàn bộ bảng và giảm hiện tượng tạo cụm.

## Lựa chọn trong ngôn ngữ lập trình

- Python `dict` và `set` dùng biến thể địa chỉ mở được tối ưu.
- Java `HashMap` dùng nối chuỗi và có thể chuyển bucket dài thành cây.
- C++ `std::unordered_map` thường dùng bucket và nối chuỗi, nhưng chi tiết phụ thuộc triển khai.
- Rust `HashMap` dùng một thiết kế địa chỉ mở tối ưu và cho phép chọn bộ tạo hàm băm.

Không có chiến lược tốt nhất cho mọi trường hợp. Lựa chọn phụ thuộc kiểu khóa, mô hình truy cập, giới hạn bộ nhớ, yêu cầu bảo mật và đặc tính của thư viện chuẩn.
