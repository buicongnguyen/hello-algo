# Bài tập

## Ôn tập khái niệm

### Quan hệ dữ liệu trong các tình huống đời thường

Hãy chọn cấu trúc phù hợp để mô hình hóa: tuyến tàu điện có các ga và đoạn nối; sơ đồ tổ chức có quan hệ cấp trên–cấp dưới; hàng người chờ mua vé.

??? success "Đáp án"

    Tuyến tàu điện phù hợp với đồ thị vì một ga có thể nối nhiều ga khác. Sơ đồ tổ chức phù hợp với cây vì mỗi đơn vị nằm trong một hệ phân cấp. Hàng người phù hợp với hàng đợi vì người đến trước thường được phục vụ trước.

### Lưu một thứ tự logic trong bộ nhớ

Một dãy phần tử có thể được lưu liên tục trong mảng hoặc phân tán thành các nút liên kết. Hãy so sánh cấu trúc logic và cấu trúc vật lý của hai cách.

??? success "Đáp án"

    Cả hai đều biểu diễn cùng thứ tự tuyến tính. Mảng đặt phần tử trong vùng nhớ liên tục và truy cập bằng chỉ mục; danh sách liên kết lưu các nút rời rạc và dùng tham chiếu để duy trì thứ tự. Cấu trúc logic giống nhau nhưng cấu trúc vật lý khác nhau.

### Kiểu dữ liệu và cấu trúc trong hồ sơ bài tập

Một hồ sơ gồm mã học sinh, tên, điểm từng môn và danh sách môn đã nộp. Hãy xác định kiểu dữ liệu cơ bản và cấu trúc dữ liệu tổng hợp.

??? success "Đáp án"

    Mã và điểm có thể là số, tên là chuỗi, trạng thái nộp có thể là boolean. Một bản ghi hoặc lớp gom các trường của một học sinh; mảng hoặc danh sách lưu điểm và môn; bảng băm có thể ánh xạ mã học sinh tới hồ sơ.

## Bài tập lập trình

### Đếm bit 1 trong biểu diễn nhị phân

Cho một số nguyên không âm, hãy trả về số bit `1` trong biểu diễn nhị phân của nó.

??? tip "Gợi ý"

    Có thể kiểm tra bit thấp nhất rồi dịch phải. Cách `n &= n - 1` xóa bit `1` thấp nhất sau mỗi vòng lặp.

[LeetCode](https://leetcode.com/problems/number-of-1-bits/)
