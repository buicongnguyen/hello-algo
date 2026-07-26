# Bài tập

## Ôn tập khái niệm

### Vài vòng đầu của sắp xếp chọn và sắp xếp nổi bọt

Với `[4, 2, 5, 1, 3]`, hãy viết mảng sau hai vòng ngoài của sắp xếp chọn tăng dần và sắp xếp nổi bọt tăng dần.

??? success "Đáp án"

    Sắp xếp chọn đưa số nhỏ nhất về đầu: sau vòng 1 là `[1,2,5,4,3]`, sau vòng 2 vẫn là `[1,2,5,4,3]`. Sắp xếp nổi bọt đẩy số lớn nhất sang phải: sau vòng 1 là `[2,4,1,3,5]`, sau vòng 2 là `[2,1,3,4,5]`.

### Các phần tử bằng nhau có thể đổi thứ tự tương đối không?

Trong dãy các bản ghi có cùng khóa nhưng nhãn khác nhau, thế nào là thuật toán sắp xếp ổn định? Vì sao thứ tự ấy có thể quan trọng?

??? success "Đáp án"

    Thuật toán ổn định giữ nguyên thứ tự tương đối của các bản ghi có khóa bằng nhau. Điều này quan trọng khi dữ liệu đã được sắp theo tiêu chí phụ hoặc khi thứ tự ban đầu mang ý nghĩa. Tính ổn định phụ thuộc vào cách triển khai, không chỉ tên thuật toán.

### So sánh sắp xếp đếm và sắp xếp cơ số

Khi nào sắp xếp đếm phù hợp hơn, và khi nào sắp xếp cơ số tránh được nhược điểm của nó?

??? success "Đáp án"

    Sắp xếp đếm hiệu quả khi khóa nguyên nằm trong phạm vi nhỏ $k$, với thời gian $O(n+k)$ và bộ nhớ $O(k)$. Nếu phạm vi giá trị rất lớn nhưng số chữ số hữu hạn, sắp xếp cơ số xử lý từng chữ số và tránh mảng đếm phủ toàn bộ phạm vi; mỗi lượt con phải ổn định.

## Bài tập lập trình

### Sắp xếp mảng bằng merge sort

Hãy cài đặt merge sort cho mảng số nguyên.

??? tip "Gợi ý"

    Chia tại giữa, sắp xếp đệ quy hai nửa rồi trộn bằng hai con trỏ. Dùng một vùng đệm phụ để tránh tạo quá nhiều mảng nhỏ.

[LeetCode](https://leetcode.com/problems/sort-an-array/)

### Sắp xếp mảng số nguyên bằng counting sort

Hãy sắp xếp một mảng số nguyên có thể chứa cả số âm bằng counting sort.

??? tip "Gợi ý"

    Tìm `min` và `max`, dùng chỉ mục `value - min` trong mảng đếm rồi ghi lại mỗi giá trị theo số lần xuất hiện. Chi phí phụ thuộc vào `max - min + 1`.
