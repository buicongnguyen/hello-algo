# Bài tập

## Ôn tập khái niệm

### Tìm kiếm sau xung đột băm

Bảng băm có 7 ô và dùng `hash(key) = key mod 7`. Các khóa `3`, `10`, `17` cùng ánh xạ tới ô 3. Hãy mô tả cách tìm `17` bằng phương pháp chuỗi và địa chỉ mở.

??? success "Đáp án"

    Với phương pháp chuỗi, ô 3 giữ một danh sách các mục và quá trình tìm kiếm duyệt cho tới `17`. Với địa chỉ mở, quá trình tìm kiếm đi theo đúng dãy thăm dò đã dùng khi chèn cho tới khi gặp `17` hoặc một ô trống chưa từng dùng.

### Phần tử đi đâu sau khi bảng băm mở rộng?

Vì sao không thể chỉ sao chép các mục sang cùng chỉ mục khi sức chứa bảng thay đổi từ 7 thành 13?

??? success "Đáp án"

    Chỉ mục phụ thuộc vào sức chứa, chẳng hạn `key mod capacity`. Khi sức chứa đổi, kết quả băm có thể đổi, nên phải tính lại vị trí của từng khóa. Quá trình này gọi là băm lại và tốn $O(n)$ cho lần mở rộng.

### Sau khi xóa 6 còn tìm được 11 không?

Một bảng địa chỉ mở dùng thăm dò tuyến tính. Khóa `1`, `6`, `11` nằm liên tiếp vì xung đột. Điều gì xảy ra nếu xóa `6` bằng cách biến ô đó thành ô chưa từng dùng?

??? success "Đáp án"

    Tìm `11` có thể dừng sớm tại ô trống và báo sai rằng khóa không tồn tại. Cần dùng dấu mộ để ghi “đã xóa” hoặc sắp xếp lại cụm thăm dò.

## Bài tập lập trình

### So sánh số lần xuất hiện ký tự của hai chuỗi

Cho hai chuỗi `s` và `t`, hãy xác định chúng có phải là hoán vị ký tự của nhau hay không.

??? tip "Gợi ý"

    Đếm tần suất từng ký tự trong bảng băm hoặc mảng đếm. Tăng theo `s`, giảm theo `t`, rồi kiểm tra mọi số đếm bằng 0.

[LeetCode](https://leetcode.com/problems/valid-anagram/)
